
/**
 * DATA CRAFT STUDIO
 * Netlify Forms -> Netlify Function -> Google Apps Script
 *
 * File: netlify/functions/lead-webhook.mjs
 *
 * Required Netlify Environment Variables:
 * 1. NETLIFY_WEBHOOK_TOKEN
 * 2. APPS_SCRIPT_WEB_APP_URL
 */

function jsonResponse(statusCode, data) {
  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    }
  });
}

function safeCompare(a, b) {
  if (typeof a !== "string" || typeof b !== "string") {
    return false;
  }

  if (a.length !== b.length) {
    return false;
  }

  let result = 0;

  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

export default async (request) => {
  try {
    // 1. Allow POST requests only
    if (request.method !== "POST") {
      return jsonResponse(405, {
        success: false,
        message: "Method not allowed."
      });
    }

    // 2. Read secure environment variables
    const webhookToken = process.env.NETLIFY_WEBHOOK_TOKEN;
    const appsScriptUrl = process.env.APPS_SCRIPT_WEB_APP_URL;

    if (!webhookToken || !appsScriptUrl) {
      console.error("Required environment variables are missing.");

      return jsonResponse(500, {
        success: false,
        message: "Server configuration is incomplete."
      });
    }

    // 3. Authenticate incoming Netlify webhook
    const requestUrl = new URL(request.url);
    const receivedToken = requestUrl.searchParams.get("key");

    if (!safeCompare(receivedToken, webhookToken)) {
      return jsonResponse(401, {
        success: false,
        message: "Unauthorised request."
      });
    }

    // 4. Read original Netlify webhook payload
    const rawBody = await request.text();

    if (!rawBody) {
      return jsonResponse(400, {
        success: false,
        message: "Empty webhook payload."
      });
    }

    let payload;

    try {
      payload = JSON.parse(rawBody);
    } catch {
      return jsonResponse(400, {
        success: false,
        message: "Invalid JSON payload."
      });
    }

    // 5. Identify the Netlify form
    const formName =
      payload.form_name ||
      payload.formName ||
      payload.payload?.form_name ||
      payload.payload?.formName ||
      "";

    // Ignore submissions from other forms
    if (formName && formName !== "enquiry") {
      return jsonResponse(200, {
        success: true,
        ignored: true,
        message: "This form is not configured for lead processing."
      });
    }

    // 6. Forward original payload to Google Apps Script
    const appsScriptResponse = await fetch(appsScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: rawBody,
      redirect: "follow"
    });

    const responseText = await appsScriptResponse.text();

    let appsScriptResult;

    try {
      appsScriptResult = JSON.parse(responseText);
    } catch {
      appsScriptResult = null;
    }

    // 7. Confirm Apps Script processing result
    if (
      !appsScriptResponse.ok ||
      !appsScriptResult ||
      appsScriptResult.success !== true
    ) {
      console.error("Apps Script processing was unsuccessful.", {
        httpStatus: appsScriptResponse.status
      });

      return jsonResponse(502, {
        success: false,
        message: "Google Apps Script did not confirm successful processing."
      });
    }

    // 8. Return direct success response to Netlify
    return jsonResponse(200, {
      success: true,
      message: "Lead webhook processed successfully.",
      result: appsScriptResult
    });

  } catch (error) {
    // Do not log secrets or customer form data
    console.error("Lead webhook error:", error.message);

    return jsonResponse(500, {
      success: false,
      message: "Internal webhook processing error."
    });
  }
};
