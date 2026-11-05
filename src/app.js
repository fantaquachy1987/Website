/* ================================================================
   DATA CRAFT STUDIO — Website
   React 18 + htm. Every page is pre-rendered to static HTML at deploy
   time (scripts/prerender.mjs) and hydrated in the browser.
   Clean URLs with History API navigation.
   ================================================================ */
(function(){
"use strict";
var React = window.React, ReactDOM = window.ReactDOM;
var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef, useContext = React.useContext;
var html = window.htm.bind(React.createElement);

/* ---------- 1. SITE CONFIG ---------- */
var SITE = {
  name: "Data Craft Studio",
  tagline: "MIS & Business Automation Solutions Studio",
  /* Set at deploy time from the site's primary URL (see scripts/prerender.mjs) */
  url: (window.__SITE_URL__ || "https://professional-website-bf6a76.netlify.app").replace(/\/$/, ""),
  /* Contact details */
  email: "pawanmahor32@gmail.com",
  emailHref: "mailto:pawanmahor32@gmail.com",
  phone: "+91 93192 74425",
  phoneHref: "tel:+919319274425",
  address: "North East Delhi, India",
  /* Social profiles: shown in the footer and contact page, and listed in structured data */
  social: [
    { name:"YouTube", icon:"youtube", href:"https://www.youtube.com/@dcstudiofox" },
    { name:"Facebook", icon:"facebook", href:"https://www.facebook.com/share/1EVZz9SCHr/" }
  ],
  hours: "Enquiries reviewed on working days"
};

/* ---------- 2. CONTENT DATA ---------- */
var SERVICES = [
{ slug:"mis-development", icon:"db", visual:"dashboard", name:"MIS Development",
  short:"Structured management information systems that bring orders, production, stock and collections into one reliable source.",
  h1:"MIS Development for Growing Businesses",
  title:"MIS Development for SMEs | Data Craft Studio",
  desc:"Custom MIS development for small and medium businesses: structured masters, entry forms, automated reports and owner dashboards built on Google Workspace.",
  intro:["A Management Information System (MIS) brings your daily operational data, such as orders, production, stock, collections and attendance, into one structured system. Every report then comes from the same source, and decisions no longer wait for someone to compile numbers.",
         "We design the MIS around how your business actually runs: who records what, when it is recorded, and which decisions depend on it. The tools are familiar ones, mainly Google Sheets, AppSheet and Apps Script, so your team can adopt the system without a long learning curve."],
  problems:["Data is spread across registers, chat messages and personal Excel files","Reports are compiled by hand at month-end, after the moment to act has passed","Different departments report different numbers for the same thing","The owner has to call people to learn order status, stock or dues"],
  solutions:["A structured data model: masters (items, parties, staff) and transaction tables with validation","Standard entry forms so data is captured once, at the source","Automated daily, weekly and monthly MIS reports","Role-wise views so each person sees what they are responsible for"],
  capabilities:["Master data design for items, customers, suppliers and staff","Department-wise data entry forms","Validation rules and dropdowns that reduce entry errors","Automated summary and exception reports","Owner and department dashboards","Access control by role"],
  suitable:["Manufacturers tracking production, stock and dispatch","Traders managing orders, stock and receivables","Service firms tracking jobs, staff and billing","Any business moving off paper registers"],
  approach:[["Understand the business","Walk through each department to see what is recorded today and which reports matter."],["Design the data model","Define masters, transactions and reports before building anything."],["Build in modules","Start with the most painful area, run it live, then add the next module."],["Train and hand over","Train each role, document the system and agree how changes will be handled."]],
  faqs:[{q:"Do we need to buy new software?",a:"Usually the MIS is built on Google Workspace tools your team may already use. If your requirements need a paid plan, such as an AppSheet subscription, it is identified and discussed with you before the build starts."},
        {q:"Can the MIS use our existing Excel files?",a:"Yes. Existing files are reviewed during discovery, and the useful data is cleaned and moved into the new structure."},
        {q:"Who maintains the system after handover?",a:"Your team receives training and documentation for day-to-day use. Ongoing support or change requests can be arranged separately."}] },
{ slug:"appsheet-solutions", icon:"phone", visual:"app", name:"AppSheet Solutions",
  short:"Mobile apps for field and shop-floor data entry, built on AppSheet with Google Sheets as the data source.",
  h1:"AppSheet App Development for Field and Shop-Floor Teams",
  title:"AppSheet App Development | Data Craft Studio",
  desc:"AppSheet app development for supervisors, stores and field teams: mobile forms with validation, photos and role-based access, built on Google Sheets.",
  intro:["AppSheet turns a well-structured Google Sheet into a mobile and desktop app. Supervisors, storekeepers and sales staff can record entries from their phones with dropdowns, photos and validation, while the data lands directly in your sheets.",
         "We design the data structure first and the app second. That keeps the app fast, simple for the person using it, and easy to extend when the business adds a new process."],
  problems:["Staff note entries on paper and someone retypes them later","Spreadsheets on a phone are hard to use and easy to break","There is no photo proof of material receipt, dispatch or site work","Everyone can see and edit data they should not touch"],
  solutions:["Role-based AppSheet apps with a simple form for each task","Dropdowns, required fields and validation at the point of entry","Photo, signature and timestamp capture where proof matters","Security filters so each user sees only their own records"],
  capabilities:["App design on top of Google Sheets","Forms with dependent dropdowns and validation","Separate views for worker, supervisor and owner","Photo, signature and barcode or QR capture where supported","Actions and automation bots for status updates","User access and security filter setup"],
  suitable:["Production supervisors recording output","Stores and inventory teams","Sales and service staff in the field","Businesses already working in Google Sheets"],
  approach:[["Map the users","List who enters what, from where and on which device."],["Structure the sheet","Design tables, keys and references so the app has a clean base."],["Build and pilot","Release to a small group first and adjust screens from real use."],["Roll out and train","Add the remaining users, train each role and hand over a short guide."]],
  faqs:[{q:"Does AppSheet need a paid plan?",a:"AppSheet offers free and paid plans, and which applies depends on the number of users and features required. We check this during discovery and confirm it with you before building. Current plan details should be verified on Google's official AppSheet pricing page."},
        {q:"Does the app work on any phone?",a:"AppSheet apps run on Android and iPhone through the AppSheet app or a mobile browser, and on desktop browsers."},
        {q:"Can it work without internet?",a:"AppSheet can capture data offline and sync when the device reconnects, depending on how the app is configured. We test this for your use case during the pilot."}] },
{ slug:"google-sheets-automation", icon:"grid", visual:"register", name:"Google Sheets Automation",
  short:"Clean, formula-driven workbooks with validation, lookups and automatic summaries that replace copy-paste work.",
  h1:"Google Sheets Automation That Removes Repetitive Work",
  title:"Google Sheets Automation Services | Data Craft Studio",
  desc:"Google Sheets automation for SMEs: restructured workbooks, dynamic summaries, validation and cross-file links that remove manual copy-paste and repeated entry.",
  intro:["Many businesses already run on Google Sheets, but the sheets grow messy over time: copied formulas, manual totals and a duplicated tab for every month. We rebuild them into structured workbooks where data is entered once and every summary updates on its own.",
         "The result stays in Google Sheets, so your team keeps working in a tool they know, with fewer chances to break it."],
  problems:["The same data is typed into several sheets","Formulas break when someone inserts a row","Monthly tabs make year-wise analysis difficult","No one is sure which file is the latest"],
  solutions:["One data table per process, with summaries built on top","Formulas such as QUERY, FILTER, XLOOKUP and ARRAYFORMULA that do not need copying down","Data validation and protected ranges to prevent accidental edits","Linked files with IMPORTRANGE instead of copy-paste"],
  capabilities:["Workbook restructuring and cleanup","Dynamic summary and pivot reports","Data validation, dropdowns and protected ranges","Links between files and departments","Conditional formatting that highlights exceptions","Templates for recurring reports"],
  suitable:["Teams already using Google Sheets daily","Owners who compile reports by hand","Accounts and admin teams handling repetitive data","Businesses preparing for an app or dashboard later"],
  approach:[["Audit the sheets","Review current files, formulas and how each sheet is used."],["Design the structure","Separate data entry from calculations and reports."],["Rebuild and migrate","Build the new workbook and move existing data across."],["Train the team","Show each user where to enter data and how to read the summaries."]],
  faqs:[{q:"Will you change how my team enters data?",a:"Only where it helps. We keep familiar layouts where possible and change entry only when it prevents errors or duplicate work."},
        {q:"Can you fix our existing sheet instead of starting over?",a:"Yes. We review the current file first and recommend a repair or a rebuild based on how it is structured."},
        {q:"Do you work in Microsoft Excel?",a:"Our focus is Google Workspace. Excel files can be imported into Google Sheets as a starting point."}] },
{ slug:"google-apps-script-automation", icon:"code", visual:"script", name:"Google Apps Script Automation",
  short:"Scripts and lightweight web apps that connect sheets, generate documents, run scheduled jobs and handle logic formulas cannot.",
  h1:"Google Apps Script Automation and Custom Web Apps",
  title:"Google Apps Script Automation | Data Craft Studio",
  desc:"Google Apps Script automation: scheduled jobs, PDF and document generation, custom web apps backed by Google Sheets, and one-click actions inside your sheets.",
  intro:["Google Apps Script is the programming layer of Google Workspace. It can move data between sheets, create PDFs from templates, run jobs on a schedule and serve simple web apps that your team opens in a browser.",
         "We use it when a process needs logic that formulas or no-code tools cannot handle cleanly, while keeping the data in your own Google account."],
  problems:["Reports and documents are prepared by hand every day","Data needs to move between files on a schedule","A no-code app has reached its limits","Manual steps depend on one person remembering to do them"],
  solutions:["Time-driven scripts for daily and weekly jobs","Document and PDF generation from sheet data","Custom HTML web apps backed by Google Sheets","Menus and buttons inside sheets for one-click actions"],
  capabilities:["Scheduled triggers and data processing","PDF, Docs and Slides generation from templates","Custom web apps with role-based screens","Email reports from your own Google account, once you authorise it","Connections to external APIs when you provide credentials","Error logging and run history"],
  suitable:["Businesses with repetitive reporting work","Teams that outgrew a no-code app","Owners who want a custom screen on top of sheets","Processes that need scheduled data movement"],
  approach:[["Define the job","Write down the trigger, input, output and who needs the result."],["Prototype the logic","Build a working version on a copy of your data."],["Harden and log","Add error handling, logging and permission checks."],["Deploy and document","Set triggers, hand over the source and document each permission."]],
  faqs:[{q:"Is Apps Script secure?",a:"Scripts run under Google accounts and access only what they are authorised to. We document every permission a script requests and set up access together with you."},
        {q:"What are the limits of Apps Script?",a:"Google applies daily quotas and execution time limits. We design around them and tell you early if a requirement needs a different platform."},
        {q:"Who owns the code?",a:"The scripts live in your Google account. You receive the source and documentation at handover."}] },
{ slug:"business-dashboards", icon:"chart", visual:"dashboard", name:"Business Dashboards",
  short:"Dashboards that show orders, production, stock, collections and tasks at a glance, with drill-down to the detail.",
  h1:"Business Dashboards for Owners and Department Heads",
  title:"Business Dashboard Development | Data Craft Studio",
  desc:"Business dashboards for SME owners: agreed KPIs, exception-first views, target vs achieved tracking and drill-down in Looker Studio, Sheets or Apps Script.",
  intro:["A dashboard is useful when it answers the questions you ask every morning. We start from those questions and build views in Looker Studio, Google Sheets or a custom web page that read directly from your operational data.",
         "Each number on the dashboard has an agreed definition and a known source, so meetings discuss what to do next rather than whose figure is correct."],
  problems:["The owner waits for someone to send the numbers","Reports show totals but not what needs attention","Each department has its own version of the figures","Charts look good but do not lead to action"],
  solutions:["KPI definitions agreed with you before any chart is made","Exception-first views: overdue, below target, low stock","Drill-down from a summary to the underlying records","Mobile-friendly layouts for owners on the move"],
  capabilities:["KPI and metric definition","Looker Studio dashboards on Google data","Dashboards inside Google Sheets","Custom HTML dashboards through Apps Script","Target vs achieved and trend views","Scheduled snapshot reports"],
  suitable:["Owners who want a daily view of the business","Department heads reviewing team performance","Businesses with data already in sheets","Teams preparing for monthly review meetings"],
  approach:[["List the questions","Agree the decisions the dashboard must support."],["Define the KPIs","Fix each metric's formula, source and refresh."],["Design and build","Lay out summary first, detail second, then build."],["Review in use","Use it in real meetings for two cycles and refine."]],
  faqs:[{q:"Which dashboard tool do you use?",a:"It depends on your data and users. Looker Studio, Google Sheets and Apps Script web pages are the common options; we recommend one after discovery."},
        {q:"How current is the data?",a:"Dashboards read from your sheets or data source. Refresh behaviour depends on the tool and is confirmed during design."},
        {q:"Can staff see a limited version?",a:"Yes. Views can be separated by role so each person sees only the numbers relevant to them."}] },
{ slug:"workflow-automation", icon:"flow", visual:"flow", name:"Workflow Automation",
  short:"Step-by-step process flows with owners, planned times and status tracking, so work moves without constant follow-up.",
  h1:"Workflow Automation for Orders, Tasks and Approvals",
  title:"Workflow Automation for SMEs | Data Craft Studio",
  desc:"Workflow automation for growing businesses: order-to-dispatch flows, checklists, delegation and approvals with planned vs actual tracking and delay reports.",
  intro:["Most delays in a growing business happen between steps. An order waits for approval, material waits for an indent, a task waits because no one followed up.",
         "Workflow automation defines each step, its owner and its planned time, then tracks actual completion. Delays become visible early, and the record shows exactly where work stopped."],
  problems:["Work stalls between departments","Follow-ups happen through repeated calls","There is no record of which step was delayed, or by whom","Recurring checklists are forgotten"],
  solutions:["Flow sheets with planned vs actual time for every step","Checklist and delegation systems with due dates","Approval steps with status and remarks","Reminder and escalation rules, once a notification channel is configured"],
  capabilities:["Process mapping and step design","Order-to-dispatch and purchase flows","Recurring checklist scheduling","Task delegation with due dates and scoring","Delay and pending reports by person","Notification hooks for email or messaging tools you authorise"],
  suitable:["Manufacturers with multi-stage order flows","Traders with order, dispatch and collection steps","Service firms assigning jobs to staff","Owners who want fewer follow-up calls"],
  approach:[["Map the process","Sit with the people who do the work and draw the flow together."],["Set owners and times","Assign each step an owner and a planned duration."],["Build the tracker","Create the flow sheet or app with planned vs actual columns."],["Review delays weekly","Use the delay report to fix bottlenecks, not just to record them."]],
  faqs:[{q:"Do we need to document our process first?",a:"No. Mapping the process is part of the work. We sit with the people who do it and draw the flow together."},
        {q:"Can reminders go on WhatsApp?",a:"It is possible through a WhatsApp Business API provider, which usually means a separate paid account. We set this up only after you choose a provider and authorise it."},
        {q:"What happens when the process changes?",a:"Steps and owners are kept in configurable tables, so most changes do not need code edits."}] }
];
SERVICES.forEach(function(s){ s.route = "service-" + s.slug; s.path = "/services/" + s.slug + "/"; });

var INDUSTRIES = [
{ slug:"manufacturing", icon:"factory", name:"Manufacturing",
  short:"Production, stores, dispatch and maintenance connected in one system.",
  h1:"MIS and Automation for Manufacturing Businesses",
  title:"MIS & Automation for Manufacturers | Data Craft Studio",
  desc:"MIS and automation for manufacturers: production and target tracking, inventory registers, order-to-dispatch flows, checklists and owner dashboards.",
  intro:"Small and mid-size factories often run on a mix of registers, Excel files and phone calls. Production, stores, dispatch and accounts each keep their own records, and the owner pieces them together. We build connected systems where each department records its own data once and the owner sees the full picture.",
  challenges:["Production output recorded on paper and entered late","Raw material and finished goods stock not matching the physical count","Order status unclear between sales, production and dispatch","Worker targets and achievement not tracked daily","Machine maintenance and quality checks depending on memory"],
  systems:[["Production register and target tracking","Shift-wise output against targets by worker, machine or line."],["Inventory and stock register","Raw material in, issue to production, returns and closing stock."],["Order-to-dispatch tracker","Each order's stage from booking to dispatch, with planned and actual dates."],["Checklists and maintenance","Daily and periodic checklists for machines, quality and housekeeping."],["Attendance and overtime","Attendance capture with hours and overtime, ready for salary calculation."],["Owner dashboard","A daily view of production, pending orders, stock alerts and overdue tasks."]],
  services:["mis-development","appsheet-solutions","workflow-automation","business-dashboards"],
  faqs:[{q:"Can supervisors enter data from the shop floor?",a:"Yes, through mobile forms or AppSheet apps designed for quick entry on a phone."},
        {q:"Do you replace our accounting software?",a:"No. Our focus is operations. Accounting stays in your existing software, and operational data can be aligned with it where needed."},
        {q:"Can the system handle multiple units or lines?",a:"Yes. Units, lines and machines are set up as masters, so reports can be filtered or compared across them."}] },
{ slug:"trading-distribution", icon:"store", name:"Trading & Distribution",
  short:"Orders, multi-location stock, collections and sales visits in one place.",
  h1:"MIS and Automation for Trading and Distribution Businesses",
  title:"MIS & Automation for Traders and Distributors | Data Craft Studio",
  desc:"MIS and automation for traders and distributors: order booking, multi-godown stock, collection follow-up, sales visit logs, price masters and owner dashboards.",
  intro:"Traders and distributors handle many parties, items and locations at once. When orders, stock and dues live in separate books, it becomes hard to know what to dispatch, what to reorder and whom to follow up with. We bring these records together so the daily picture is clear.",
  challenges:["Orders booked through calls and messages with no central list","Stock spread across godowns with no live balance","Outstanding payments followed up from memory","Salesperson visits and orders recorded inconsistently","Price lists and schemes updated in several places"],
  systems:[["Order booking and tracking","One list of orders from booking to delivery, with status by party."],["Multi-location stock register","Stock in, out and transfers by godown, with reorder alerts."],["Collection follow-up tracker","Party-wise dues, promised dates and follow-up history."],["Sales visit log","Visits, orders and remarks recorded by each salesperson."],["Price list master","One controlled price list feeding orders and quotations."],["Owner dashboard","Sales, stock position, dues and pending dispatch at a glance."]],
  services:["google-sheets-automation","appsheet-solutions","business-dashboards","google-apps-script-automation"],
  faqs:[{q:"Can sales staff book orders from their phones?",a:"Yes. An AppSheet app or a simple web form can capture orders in the field and add them to the central order list."},
        {q:"Can it show party-wise outstanding?",a:"Yes, if invoice and receipt data is captured or imported, outstanding can be summarised by party with ageing."},
        {q:"Will it connect to our billing software?",a:"Data can usually be exported from billing software and imported into the system. Direct connections depend on what your software allows and are assessed during discovery."}] },
{ slug:"service-businesses", icon:"briefcase", name:"Service Businesses",
  short:"Enquiries, jobs, staff tasks and renewals tracked without gaps.",
  h1:"MIS and Automation for Service Businesses",
  title:"MIS & Automation for Service Businesses | Data Craft Studio",
  desc:"MIS and automation for service businesses: enquiry tracking, job cards, task delegation, AMC and renewal reminders, billing trackers and client reporting.",
  intro:"Service businesses sell time and expertise. Enquiries, jobs, staff schedules and renewals need close tracking, because a missed follow-up is lost revenue and a missed deadline is a lost client. We build systems that keep every job and every client commitment visible.",
  challenges:["Enquiries tracked in notebooks or chat apps","Job status unknown until the client calls","Staff tasks assigned verbally","AMC and subscription renewals missed","Billing delayed because job completion is not recorded"],
  systems:[["Enquiry and lead tracker","Every enquiry with source, owner, next action and status."],["Job card and ticket system","Jobs from request to closure, with assigned staff and timelines."],["Task delegation","Tasks with owners, due dates and completion tracking."],["Renewal and AMC tracker","Contracts with renewal dates and advance reminders."],["Billing tracker","Completed jobs flowing to billing, with pending invoices visible."],["Client reporting","Periodic job summaries prepared from the same data."]],
  services:["workflow-automation","google-apps-script-automation","appsheet-solutions","business-dashboards"],
  faqs:[{q:"Can field staff update job status from site?",a:"Yes. A mobile form or AppSheet app lets staff update status, add photos and record time on site."},
        {q:"Can clients receive automatic updates?",a:"Automatic client messages need a configured email or messaging channel. This is set up only with your authorisation and the provider of your choice."},
        {q:"Is this suitable for a small team?",a:"Yes. Systems can start with a single module, such as enquiry tracking, and grow as the team does."}] }
];
INDUSTRIES.forEach(function(i){ i.route = "industry-" + i.slug; i.path = "/industries/" + i.slug + "/"; });

var STEPS = [
  ["Discovery call","A short conversation about your business, current tools and the problem you want solved first."],
  ["Process mapping","We study how data moves today: who records it, where, and which reports depend on it."],
  ["Prototype","A working first version on sample data, so you can react to something real."],
  ["Build and test","The full system is built in modules and tested with your team's actual entries."],
  ["Training and handover","Role-wise training, documentation and transfer of all files to your account."],
  ["Support and improvement","Help during the first weeks of use, and planned changes as the business grows."]
];

var PORTFOLIO = [
  { id:"p1", industry:"manufacturing", viz:"bars", title:"Production Target vs Achieved Dashboard", problem:"Shows daily output against target by worker and machine, with below-target entries highlighted.", tools:["Google Sheets","Apps Script","Dashboard"] },
  { id:"p2", industry:"manufacturing", viz:"flow", title:"Order-to-Dispatch Tracker", problem:"Tracks each order through planning, production, quality check and dispatch with planned vs actual dates.", tools:["AppSheet","Google Sheets"] },
  { id:"p3", industry:"service-businesses", viz:"list", title:"Checklist and Delegation System", problem:"Recurring checklists and one-off tasks with owners, due dates and weekly completion scores.", tools:["Apps Script","Web app"] },
  { id:"p4", industry:"manufacturing", viz:"table", title:"Raw Material Stock Register", problem:"Material in, issue, returns and closing stock with minimum-level alerts.", tools:["AppSheet","Google Sheets"] },
  { id:"p5", industry:"trading-distribution", viz:"line", title:"Collection Follow-up Tracker", problem:"Party-wise dues with ageing, promised dates and follow-up history for the accounts team.", tools:["Google Sheets","Looker Studio"] },
  { id:"p6", industry:"trading-distribution", viz:"table", title:"Multi-Godown Stock View", problem:"Stock balance by godown with transfers and reorder flags.", tools:["Google Sheets","Apps Script"] },
  { id:"p7", industry:"service-businesses", viz:"flow", title:"Enquiry-to-Quotation Pipeline", problem:"Enquiries tracked from first contact to quotation and follow-up, with owner and next action.", tools:["AppSheet","Dashboard"] },
  { id:"p8", industry:"service-businesses", viz:"line", title:"AMC Renewal Reminder Sheet", problem:"Contract list with renewal dates, advance reminder flags and renewal status.", tools:["Google Sheets","Apps Script"] }
];

var CASES = [
  { id:"cs1", tab:"Order-to-dispatch flow", industry:"Manufacturing",
    title:"Order-to-Dispatch Visibility for a Component Manufacturer",
    context:"A fictional manufacturer receives orders by phone and email. Orders are written in a register and passed to production verbally. Dispatch learns about ready goods only when the production supervisor calls.",
    challenge:["No single list of open orders and their stage","Customers calling for status, and staff calling each other to find out","Delays noticed only after the promised date had passed","Owner spending part of each day chasing updates"],
    approach:["Mapped the order flow with sales, production, quality and dispatch staff","Defined five stages, each with an owner and a planned time","Built a pilot with one product line before rolling out to all orders"],
    solution:["Order entry form feeding a central order sheet","AppSheet app for supervisors to update stage and quantities","Planned vs actual time recorded for every stage","Daily pending-orders summary and owner dashboard"],
    measure:["Orders delivered after the promised date","Time spent each day chasing order status","Average time an order spends in each stage"],
    tools:["Google Sheets","AppSheet","Apps Script","Looker Studio"] },
  { id:"cs2", tab:"Collection follow-up", industry:"Trading & Distribution",
    title:"Collection Follow-up System for a Distributor",
    context:"A fictional distributor tracks outstanding payments in its billing software but plans follow-up calls from memory. Promised payment dates are noted on paper or not at all.",
    challenge:["No shared view of which party to call today","Promised dates forgotten or never recorded","Ageing reports pulled manually once a month","Salespeople and accounts team working from different lists"],
    approach:["Agreed the fields needed for each follow-up with the accounts team","Set a weekly import routine from the billing software export","Designed views for accounts staff, salespeople and the owner"],
    solution:["Party-wise outstanding sheet with automatic ageing buckets","Follow-up log with promised date and next action","Today's call list generated from due and promised dates","Owner dashboard showing dues by ageing and by salesperson"],
    measure:["Outstanding amount by ageing bucket, week on week","Share of promised payments received on the promised date","Time taken to prepare the daily call list"],
    tools:["Google Sheets","Apps Script","Looker Studio"] }
];

var ARTICLES = [
{ slug:"signs-you-have-outgrown-manual-registers", tag:"MIS basics", seoTitle:"7 Signs You Have Outgrown Manual Registers",
  title:"7 Signs Your Business Has Outgrown Manual Registers",
  desc:"Seven practical signs that paper registers and scattered spreadsheets are slowing your business down, and a sensible first step towards a structured MIS.",
  summary:"Paper registers work until the business grows past one person's memory. These are the signs that point to a structured system.",
  sections:[
   {h:"Why registers stop working",p:["Registers and simple spreadsheets serve a young business well. They are flexible, cheap and everyone understands them. The trouble starts when volume grows, more people record data and the owner can no longer hold every detail in mind.","At that point the register still records data, but it no longer answers questions quickly. These seven signs usually appear together."]},
   {h:"The seven signs",ol:["You find out about a problem days after it happened.","Month-end reports take several days to prepare.","Two people give you different numbers for the same thing.","Stock in the books does not match stock on the floor.","You call staff several times a day to ask for status.","The same entry is written in more than one register or file.","One person's leave disrupts reporting for the whole team."]},
   {h:"What to do first",p:["Do not try to computerise everything at once. Pick the one area where the delay or confusion costs the most, often orders, stock or collections, and structure that first.","List what is recorded today, who records it and which decisions depend on it. That list becomes the specification for the first module of your MIS."]},
   {h:"Start small, then connect",p:["A focused first module that people actually use is worth more than a complete system no one trusts. Once the first module is running, the next one connects to it through shared masters such as items, parties and staff."]}
  ] },
{ slug:"appsheet-or-apps-script-which-to-choose", tag:"Tools", seoTitle:"AppSheet or Apps Script: Which to Choose",
  title:"AppSheet or Apps Script: Choosing the Right Tool for Your Process",
  desc:"A practical comparison of AppSheet and Google Apps Script for business automation: where each fits, where each struggles, and how they work together.",
  summary:"Both tools sit on top of Google Sheets. The right choice depends on who uses the system and how much custom logic it needs.",
  sections:[
   {h:"Two tools, one data source",p:["AppSheet and Google Apps Script both work well with Google Sheets, which is why they are often compared. They solve different problems, and many good systems use both."]},
   {h:"When AppSheet fits",p:["AppSheet is a no-code platform for building mobile and desktop apps. It suits data entry by many users on phones, especially when you need forms, photos, simple workflows and role-based views quickly."],ul:["Field or shop-floor staff entering data on phones","Forms with dropdowns, photos and signatures","Standard views: lists, details, dashboards","Fast iteration with the people using the app"]},
   {h:"When Apps Script fits",p:["Apps Script is a JavaScript-based scripting platform. It suits scheduled jobs, document generation, complex calculations and custom web pages where you need full control over layout and logic."],ul:["Scheduled reports and data movement between files","PDF or document generation from templates","Custom web apps with a specific layout","Logic that is awkward to express without code"]},
   {h:"Things to check before choosing",p:["Check the number of users and the licensing that applies to them, since AppSheet plans differ by usage. Check Apps Script quotas if jobs process large volumes. And consider who will maintain the system: no-code apps are easier for an internal team to adjust, while scripts need someone comfortable reading code."]},
   {h:"Using both together",p:["A common pattern is AppSheet for data entry and Apps Script for scheduled processing and reports, both reading the same Google Sheets. Each tool does what it does best, and the data stays in one place."]}
  ] },
{ slug:"what-to-put-on-an-owner-dashboard", tag:"Dashboards",
  title:"What Belongs on an Owner's Daily Dashboard",
  desc:"How to decide what goes on a business owner's daily dashboard: start from decisions, show exceptions first, and keep every number traceable to its source.",
  summary:"An owner's dashboard should be short, action-oriented and trusted. Here is a practical way to decide what goes on it.",
  sections:[
   {h:"Start from decisions, not data",p:["The most common dashboard mistake is starting with the data available and charting all of it. A better start is a list of decisions the owner makes every day or week, and the numbers each decision depends on."]},
   {h:"Show exceptions first",p:["Totals tell you the business is running; exceptions tell you where to act. Put items that need attention at the top: orders past their promised date, production below target, stock below minimum, payments overdue and tasks pending beyond their due date."]},
   {h:"A typical starting set",ul:["Orders: received, in process, overdue","Production: today's output against target","Stock: items below minimum level","Collections: dues by ageing bucket","Tasks: overdue items by person"],p:["This is a starting point, not a template. Your own list should come from the decisions you make."]},
   {h:"Make every number traceable",p:["Each figure should have a written definition and a single source. When a number can be clicked through to the records behind it, discussions move from questioning the figure to acting on it."]},
   {h:"Keep it short",p:["If the dashboard needs scrolling to find what matters, it has too much on it. Move secondary views to department pages and keep the owner view to one screen where possible."]}
  ] }
];
ARTICLES.forEach(function(a){ a.route = "article-" + a.slug; a.path = "/resources/" + a.slug + "/";
  var words = 0; a.sections.forEach(function(s){ (s.p||[]).concat(s.ul||[], s.ol||[]).forEach(function(t){ words += t.split(/\s+/).length; }); });
  a.mins = Math.max(2, Math.round(words/200)); });

var HOME_FAQS = [
  {q:"What kind of businesses do you work with?",a:"Small and medium manufacturers, traders and distributors, and service businesses, especially those currently running on registers and spreadsheets."},
  {q:"Which tools do you build with?",a:"Mainly Google Workspace: Google Sheets, AppSheet, Google Apps Script and Looker Studio. The choice depends on your process, users and budget."},
  {q:"How much does a project cost?",a:"It depends on the scope. After a discovery call, you receive a written scope and quotation before any work begins."},
  {q:"How long does a project take?",a:"Timelines depend on the number of modules and users. A single-sheet automation is quicker than a multi-department MIS. We share a schedule along with the scope."},
  {q:"Do we own the system after it is built?",a:"The aim is for files, apps and scripts to live in your own Google account, with documentation handed over at the end. Exact terms are confirmed in the project agreement."},
  {q:"Do you offer support after handover?",a:"Support and change requests can be arranged after handover. The arrangement is agreed separately based on your needs."}
];

var BTYPES = ["Manufacturing","Trading & Distribution","Service Business","Other"];

/* ---------- 3. ICONS ---------- */
var ICONS = {
  register:"M5 3h11l3 3v15H5z M9 8h6 M9 12h6 M9 16h4",
  clock:"M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0 M12 7v5l3 2",
  truck:"M2 6h12v10H2z M14 9h4l4 4v3h-8 M5 18.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0 M15 18.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0",
  box:"M3 7l9-4 9 4v10l-9 4-9-4z M3 7l9 4 9-4 M12 11v10",
  tasks:"M5 4h14v16H5z M9 11l2 2 4-4",
  user:"M12 12a4 4 0 1 0 0-8a4 4 0 1 0 0 8z M4 21c1-4 4-6 8-6s7 2 8 6",
  factory:"M3 21V10l5 3V10l5 3V6l8 4v11z M7 17h2 M12 17h2 M17 17h2",
  store:"M4 9l1.5-5h13L20 9 M4 9v11h16V9 M4 9h16 M10 20v-6h4v6",
  briefcase:"M3 8h18v12H3z M8 8V5h8v3 M3 13h18",
  chart:"M4 20V4 M4 20h16 M8 16v-5 M12 16V8 M16 16v-7",
  flow:"M4 4h6v5H4z M14 15h6v5h-6z M7 9v3h10v3",
  phone:"M7 2h10v20H7z M11 18h2",
  grid:"M3 4h18v16H3z M3 9h18 M3 14h18 M9 4v16 M15 4v16",
  code:"M8 8l-4 4 4 4 M16 8l4 4-4 4 M14 5l-4 14",
  db:"M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  arrow:"M5 12h14 M13 6l6 6-6 6",
  chev:"M6 9l6 6 6-6",
  menu:"M4 7h16 M4 12h16 M4 17h16",
  close:"M6 6l12 12 M18 6L6 18",
  check:"M5 12l5 5L20 7",
  x:"M8 8l8 8 M16 8l-8 8",
  info:"M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0 M12 11v6 M12 7.5v.5",
  mail:"M3 5h18v14H3z M3 6l9 7 9-7",
  pin:"M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z M12 11a2 2 0 1 0 0-4a2 2 0 1 0 0 4z",
  bell:"M6 16v-5a6 6 0 1 1 12 0v5l2 2H4z M10 21h4",
  camera:"M4 7h4l2-2h4l2 2h4v12H4z M12 16a3 3 0 1 0 0-6a3 3 0 1 0 0 6z",
  doc:"M6 3h9l4 4v14H6z M14 3v5h5 M9 13h7 M9 17h5",
  alert:"M12 4l9 16H3z M12 10v4 M12 17v.5",
  youtube:"M3 8.5c0-2 1.2-3.2 3.2-3.4C8 5 10 5 12 5s4 0 5.8.1c2 .2 3.2 1.4 3.2 3.4v7c0 2-1.2 3.2-3.2 3.4-1.8.1-3.8.1-5.8.1s-4 0-5.8-.1C4.2 18.7 3 17.5 3 15.5z M10 9v6l5-3z",
  facebook:"M14 21v-8h3l.5-3.5H14V7.5c0-1 .4-1.7 1.8-1.7H18V2.7c-.5-.1-1.6-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.7v2.3h-3V13h3v8"
};
function Icon(p){ var s = p.s || 20;
  return html`<svg className="ic" width=${s} height=${s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth=${p.w||1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d=${ICONS[p.n]}/></svg>`; }

/* ---------- 4. ROUTING ---------- */
var RouteCtx = React.createContext("home");
function routeFromPath(path){
  var p = path || "/"; try { p = decodeURIComponent(p); } catch(e){}
  p = p.replace(/\/index\.html$/, "/"); if (!/\/$/.test(p)) p += "/";
  return PATHS[p] || "404";
}
function currentRoute(){ return typeof location !== "undefined" ? routeFromPath(location.pathname) : "home"; }
function hrefFor(to){ var r = R[to]; return r ? r.path : "/"; }
function navigate(url){ window.history.pushState(null, "", url); window.dispatchEvent(new Event("dcs:navigate")); }
function useRoute(){
  var st = useState(currentRoute()), r = st[0], setR = st[1];
  useEffect(function(){ function f(){ setR(currentRoute()); }
    window.addEventListener("popstate", f); window.addEventListener("dcs:navigate", f);
    return function(){ window.removeEventListener("popstate", f); window.removeEventListener("dcs:navigate", f); }; }, []);
  return r;
}
function A(p){
  var cur = useContext(RouteCtx);
  var rest = Object.assign({}, p); delete rest.to; delete rest.children; delete rest.q; delete rest.onClick;
  var href = hrefFor(p.to) + (p.q || "");
  function click(e){
    if (p.onClick) p.onClick(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault(); navigate(href);
  }
  return html`<a href=${href} aria-current=${cur === p.to ? "page" : undefined} onClick=${click} ...${rest}>${p.children}</a>`;
}

/* ---------- 5. SEO HEAD MANAGER ---------- */
function headTag(sel, make){ var el = document.head.querySelector(sel); if(!el){ el = make(); document.head.appendChild(el); } return el; }
function setMeta(key, val, isProp){
  var attr = isProp ? "property" : "name";
  var el = headTag("meta["+attr+'="'+key+'"]', function(){ var m = document.createElement("meta"); m.setAttribute(attr, key); return m; });
  el.setAttribute("content", val);
}
function applySeo(page){
  var full = SITE.url + page.path;
  document.title = page.title;
  setMeta("description", page.desc);
  setMeta("robots", page.noindex ? "noindex, follow" : "index, follow");
  setMeta("og:title", page.title, true); setMeta("og:description", page.desc, true);
  setMeta("og:type", page.ogType || "website", true); setMeta("og:url", full, true); setMeta("og:site_name", SITE.name, true);
  setMeta("twitter:card", "summary");
  var c = headTag('link[rel="canonical"]', function(){ var l = document.createElement("link"); l.setAttribute("rel","canonical"); return l; });
  if (page.noindex) c.removeAttribute("href"); else c.setAttribute("href", full);
  var s = headTag('script[data-dcs-ld]', function(){ var x = document.createElement("script"); x.type = "application/ld+json"; x.setAttribute("data-dcs-ld",""); return x; });
  s.textContent = JSON.stringify(buildLd(page));
}
var ORG_ID = SITE.url + "/#organization";
function buildLd(page){
  var g = [];
  var org = { "@type":"ProfessionalService", "@id":ORG_ID, name:SITE.name, url:SITE.url + "/", description:"MIS and business automation studio building Google Sheets, AppSheet and Apps Script systems and business dashboards for small and medium businesses.",
              knowsAbout:["Management Information Systems","Google Sheets automation","AppSheet","Google Apps Script","Business dashboards","Workflow automation"],
              logo:SITE.url + "/logo.jpg", image:SITE.url + "/logo.jpg", email:SITE.email, telephone:SITE.phone,
              address:{ "@type":"PostalAddress", addressRegion:"North East Delhi", addressLocality:"Delhi", addressCountry:"IN" },
              sameAs:SITE.social.map(function(x){ return x.href; }) };
  if (page.route === "home") { g.push(org); g.push({ "@type":"WebSite", "@id":SITE.url+"/#website", url:SITE.url+"/", name:SITE.name, publisher:{ "@id":ORG_ID } }); }
  if (page.crumbs) g.push({ "@type":"BreadcrumbList", itemListElement: page.crumbs.map(function(c,i){ var r = R[c[1]]; return { "@type":"ListItem", position:i+1, name:c[0], item: SITE.url + (r ? r.path : "/") }; }) });
  if (page.service) g.push({ "@type":"Service", name:page.service.name, serviceType:page.service.name, description:page.desc, url:SITE.url+page.path, provider:{ "@type":"ProfessionalService", "@id":ORG_ID, name:SITE.name } });
  if (page.article) g.push({ "@type":"Article", headline:page.article.title, description:page.desc, mainEntityOfPage:SITE.url+page.path, author:{ "@type":"Organization", name:SITE.name }, publisher:{ "@type":"Organization", name:SITE.name } });
  if (page.route === "contact") g.push({ "@type":"ContactPage", name:page.title, url:SITE.url+page.path });
  if (page.route === "about") g.push({ "@type":"AboutPage", name:page.title, url:SITE.url+page.path });
  if (page.faqs && page.faqs.length) g.push({ "@type":"FAQPage", mainEntity: page.faqs.map(function(f){ return { "@type":"Question", name:f.q, acceptedAnswer:{ "@type":"Answer", text:f.a } }; }) });
  return { "@context":"https://schema.org", "@graph": g };
}

/* ---------- 6. SHARED COMPONENTS ---------- */
function Logo(p){
  return html`<${A} to="home" className="logo" aria-label="Data Craft Studio, home">
    <img className="logo-mark" src="/logo-mark.jpg" width="40" height="40" alt="" decoding="async"/>
    <span className="logo-txt">Data Craft Studio<small>Build · Automate · Grow</small></span>
  <//>`;
}
function Social(p){
  return html`<ul className=${"social" + (p.className ? " " + p.className : "")}>
    ${SITE.social.map(function(x){ return html`<li key=${x.name}><a href=${x.href} target="_blank" rel="noopener noreferrer" aria-label=${"Data Craft Studio on " + x.name + " (opens in a new tab)"}><${Icon} n=${x.icon} s=${18}/><span>${x.name}</span></a></li>`; })}
  </ul>`;
}

var NAV = [
  { label:"Home", to:"home" },
  { label:"About", to:"about" },
  { label:"Services", to:"services", items:[{label:"All services", to:"services"}].concat(SERVICES.map(function(s){ return {label:s.name, to:s.route}; })) },
  { label:"Industries", to:"industries", items:[{label:"All industries", to:"industries"}].concat(INDUSTRIES.map(function(i){ return {label:i.name, to:i.route}; })) },
  { label:"Our Work", to:"our-work", items:[{label:"Our Work", to:"our-work"},{label:"Portfolio", to:"portfolio"},{label:"Case Studies", to:"case-studies"}] },
  { label:"Resources", to:"resources" },
  { label:"Contact", to:"contact" }
];
function groupActive(n, route){
  if (n.to === route) return true;
  if (n.items && n.items.some(function(i){ return i.to === route; })) return true;
  if (n.to === "resources" && route.indexOf("article-") === 0) return true;
  return false;
}

function Header(p){
  var route = p.route;
  var o = useState(false), open = o[0], setOpen = o[1];
  var d = useState(null), drop = d[0], setDrop = d[1];
  useEffect(function(){ setOpen(false); setDrop(null); var a = document.activeElement; if (a && a.closest && a.closest(".site-header") && a.blur) a.blur(); }, [route]);
  useEffect(function(){
    function key(e){ if (e.key === "Escape"){ setOpen(false); setDrop(null); } }
    function click(e){ if (!e.target.closest || !e.target.closest(".nav-item")) setDrop(null); }
    document.addEventListener("keydown", key); document.addEventListener("click", click);
    return function(){ document.removeEventListener("keydown", key); document.removeEventListener("click", click); };
  }, []);
  useEffect(function(){ document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  return html`<header className="site-header">
    <div className="wrap hdr">
      <${Logo}/>
      <nav className="nav" aria-label="Main">
        ${NAV.map(function(n, i){
          var act = groupActive(n, route) ? " active" : "";
          if (!n.items) return html`<div className="nav-item" key=${n.to}><${A} to=${n.to} className=${"nav-link"+act}>${n.label}<//></div>`;
          return html`<div className=${"nav-item"+(drop===i?" open":"")} key=${n.to}>
            <button type="button" className=${"nav-link"+act} aria-expanded=${drop===i} aria-haspopup="true" onClick=${function(){ setDrop(drop===i?null:i); }}>${n.label}<${Icon} n="chev" s=${14}/></button>
            <div className="menu" role="menu">
              ${n.items.map(function(it){ return html`<${A} key=${it.to} to=${it.to} role="menuitem">${it.label}<//>`; })}
            </div></div>`;
        })}
      </nav>
      <${A} to="contact" className="btn btn-primary hdr-cta">Book a Consultation<//>
      <button type="button" className="menu-btn" aria-expanded=${open} aria-controls="drawer" onClick=${function(){ setOpen(!open); }}>
        <${Icon} n=${open?"close":"menu"} s=${18}/>${open ? "Close" : "Menu"}</button>
    </div>
    ${open && html`<div className="drawer" id="drawer">
      <nav className="wrap" aria-label="Mobile">
        ${NAV.map(function(n){ return html`<div className="d-group" key=${n.to}>
          ${n.items ? html`<span className="d-title">${n.label}</span><div className="d-sub">${n.items.map(function(it){ return html`<${A} key=${it.to} to=${it.to}>${it.label}<//>`; })}</div>`
                    : html`<${A} to=${n.to}>${n.label}<//>`}
        </div>`; })}
        <div style=${{paddingTop:"16px"}}><${A} to="contact" className="btn btn-primary">Book a Consultation<//></div>
      </nav></div>`}
  </header>`;
}

function Footer(){
  return html`<footer className="site-footer on-dark">
    <div className="wrap f-top">
      <div className="f-brand">
        <${A} to="home" className="f-logo" aria-label="Data Craft Studio, home"><img src="/logo.jpg" width="160" height="160" alt="Data Craft Studio logo: Build, Automate, Grow" loading="lazy" decoding="async"/><//>
        <p>MIS and business automation for small and medium businesses that are ready to move beyond registers and scattered spreadsheets.</p>
        <ul className="contact-list" style=${{gap:"8px"}}>
          <li><${Icon} n="mail" s=${18}/>${SITE.emailHref ? html`<a href=${SITE.emailHref}>${SITE.email}</a>` : html`<${A} to="contact">${SITE.email}<//>`}</li>
          <li><${Icon} n="phone" s=${18}/>${SITE.phoneHref ? html`<a href=${SITE.phoneHref}>${SITE.phone}</a>` : html`<span>${SITE.phone}</span>`}</li>
          <li><${Icon} n="pin" s=${18}/><span>${SITE.address}</span></li>
        </ul>
        <${Social}/>
      </div>
      <div><h2>Services</h2><ul>${SERVICES.map(function(s){ return html`<li key=${s.slug}><${A} to=${s.route}>${s.name}<//></li>`; })}</ul></div>
      <div><h2>Industries</h2><ul>${INDUSTRIES.map(function(i){ return html`<li key=${i.slug}><${A} to=${i.route}>${i.name}<//></li>`; })}<li><${A} to="industries">All industries<//></li></ul></div>
      <div><h2>Company</h2><ul>
        <li><${A} to="about">About Us<//></li><li><${A} to="our-work">Our Work<//></li><li><${A} to="portfolio">Portfolio<//></li>
        <li><${A} to="case-studies">Case Studies<//></li><li><${A} to="resources">Resources<//></li><li><${A} to="contact">Contact Us<//></li></ul></div>
    </div>
    <div className="wrap f-bottom">
      <span>© 2026 Data Craft Studio. All rights reserved.</span>
      <span><${A} to="privacy-policy">Privacy Policy<//> · <${A} to="terms-and-conditions">Terms & Conditions<//></span>
    </div>
  </footer>`;
}

function Crumbs(p){
  return html`<nav aria-label="Breadcrumb"><ol className="crumbs">
    ${p.items.map(function(c, i){ var last = i === p.items.length-1;
      return html`<li key=${c[1]+i}>${last ? html`<span aria-current="page">${c[0]}</span>` : html`<${A} to=${c[1]}>${c[0]}<//>`}</li>`; })}
  </ol></nav>`;
}
function PageHero(p){
  return html`<section className="page-hero"><div className="wrap">
    ${p.crumbs && html`<${Crumbs} items=${p.crumbs}/>`}
    ${p.eyebrow && html`<span className="eyebrow">${p.eyebrow}</span>`}
    <h1 className="h1" style=${{maxWidth:"22ch"}}>${p.title}</h1>
    ${p.lead && html`<p className="lead">${p.lead}</p>`}
    ${p.children}
  </div></section>`;
}
function SectionHead(p){
  return html`<div className=${"section-head"+(p.action?" split":"")}>
    <div style=${{display:"grid",gap:"12px"}}>
      ${p.eyebrow && html`<span className="eyebrow">${p.eyebrow}</span>`}
      <h2 className="h2" id=${p.id}>${p.title}</h2>
      ${p.lead && html`<p className="lead">${p.lead}</p>`}
    </div>
    ${p.action || null}
  </div>`;
}
function Faq(p){
  return html`<div className="faq">${p.items.map(function(f, i){ return html`<details key=${i}><summary>${f.q}</summary><div className="ans">${f.a}</div></details>`; })}</div>`;
}
function CtaBand(p){
  return html`<section className="cta-band on-dark" aria-labelledby="cta-h"><div className="wrap cta-inner">
    <div style=${{display:"grid",gap:"12px"}}>
      <h2 className="h2" id="cta-h">${p.title || "Book a consultation"}</h2>
      <p className="lead">${p.lead || "Tell us how your business runs today. We will suggest a practical first step, whether that is one automated sheet or a complete MIS."}</p>
    </div>
    <div className="actions">
      <${A} to="contact" className="btn btn-light" q=${p.service ? "?service="+p.service : ""}>${p.cta || "Book a Consultation"} <${Icon} n="arrow" s=${18}/><//>
      ${p.secondary || null}
    </div>
  </div></section>`;
}
function Demo(p){ return html`<span className="demo"><${Icon} n="info" s=${12} w=${2}/>${p.children || "Demonstration placeholder"}</span>`; }
function Notice(p){ return html`<div className="notice" role="note"><${Icon} n=${p.icon||"info"} s=${18}/><div>${p.title && html`<b>${p.title}</b>`}${p.children}</div></div>`; }
function Ticks(p){ return html`<ul className=${"ticks"+(p.x?" xlist":"")}>${p.items.map(function(t,i){ return html`<li key=${i}><${Icon} n=${p.x?"x":"check"} s=${18} w=${2}/><span>${t}</span></li>`; })}</ul>`; }

/* ---------- 7. ILLUSTRATIVE MOCKS (sample data only) ---------- */
var REG_ROWS = [["02 Nov","SO-1182","Customer A","1,200","Production","info"],["02 Nov","SO-1183","Customer B","800","Quality check","warn"],["01 Nov","SO-1176","Customer C","2,500","Dispatched","ok"],["01 Nov","SO-1179","Customer D","600","Overdue","err"],["31 Oct","SO-1171","Customer E","1,000","Dispatched","ok"]];
function RegisterMock(p){
  return html`<div className=${"mock "+(p.className||"")}>
    <div className="mock-bar"><span className="dots"><i></i><i></i><i></i></span><span className="fname">Order_Register.gsheet</span></div>
    <div className="tbl-scroll"><table className="reg"><thead><tr><th>Date</th><th>Order</th><th>Party</th><th>Qty</th><th>Stage</th></tr></thead>
      <tbody>${REG_ROWS.map(function(r){ return html`<tr key=${r[1]}><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td className="num">${r[3]}</td><td><span className=${"chip "+r[5]}>${r[4]}</span></td></tr>`; })}</tbody></table></div>
  </div>`;
}
function TargetChart(){
  var days = ["Mon","Tue","Wed","Thu","Fri","Sat"], tgt = 120, ach = [104,118,96,125,112,121];
  var W = 300, H = 150, pl = 26, pr = 6, pt = 12, pb = 18, max = 140, ch = H-pt-pb, bw = (W-pl-pr)/days.length;
  function y(v){ return pt + ch - (v/max)*ch; }
  return html`<svg className="chart" viewBox=${"0 0 "+W+" "+H} role="img" aria-label="Sample bar chart: daily output against a target of 120 units">
    ${[0,40,80,120].map(function(t){ return html`<g key=${t}><line className="c-grid" x1=${pl} x2=${W-pr} y1=${y(t)} y2=${y(t)}/><text className="c-lbl" x=${pl-5} y=${y(t)+3} textAnchor="end">${t}</text></g>`; })}
    ${ach.map(function(v,i){ var x = pl + i*bw + bw*.22, w = bw*.56; return html`<g key=${i}>
      <rect className=${v>=tgt?"c-ach":"c-dim"} x=${x} y=${y(v)} width=${w} height=${(v/max)*ch}/>
      <text className="c-val" x=${x+w/2} y=${y(v)-3} textAnchor="middle">${v}</text>
      <text className="c-lbl" x=${x+w/2} y=${H-5} textAnchor="middle">${days[i]}</text></g>`; })}
    <line className="c-tgt" x1=${pl} x2=${W-pr} y1=${y(tgt)} y2=${y(tgt)}/>
  </svg>`;
}
function DashboardMock(p){
  var k = [["Orders in process","37"],["Dispatched today","12"],["Collections due","₹4.8 L"],["Tasks overdue","5",1]];
  return html`<div className=${"mock "+(p.className||"")}>
    <div className="mock-bar"><span className="dots"><i></i><i></i><i></i></span><span className="fname">Owner Dashboard</span><span className="live"><i></i>Synced</span></div>
    <div className="dash-body">
      <div className="kpis">${k.map(function(x){ return html`<div key=${x[0]} className=${"kpi"+(x[2]?" flag":"")}><span className="l">${x[0]}</span><span className="v">${x[1]}</span></div>`; })}</div>
      <div className="chart-wrap">
        <div className="chart-head"><span>Output vs target · this week</span><span className="legend"><span><i className="sw a"></i>Met</span><span><i className="sw d"></i>Below</span><span><i className="sw t"></i>Target</span></span></div>
        <${TargetChart}/>
      </div>
    </div>
  </div>`;
}
function FlowMock(){
  var st = [["Order received","Planned 01 Nov 10:00 · Done 01 Nov 09:40","done"],["Production planning","Planned 01 Nov 16:00 · Done 01 Nov 15:10","done"],["Production","Planned 03 Nov 18:00 · In progress","now"],["Quality check","Planned 04 Nov 12:00","todo"],["Dispatch","Planned 04 Nov 17:00","todo"]];
  return html`<div className="mock"><div className="mock-bar"><span className="dots"><i></i><i></i><i></i></span><span className="fname">Order SO-1182 · Flow</span><span className="live"><i></i>Tracking</span></div>
    <div className="flow-mock">${st.map(function(s){ return html`<div className="fstep" key=${s[0]}>
      <span className=${"fdot "+s[2]}>${s[2]==="done" && html`<${Icon} n="check" s=${12} w=${3}/>`}</span>
      <div><b>${s[0]}</b><span>${s[1]}</span></div>
      <span className=${"chip "+(s[2]==="done"?"ok":s[2]==="now"?"warn":"info")}>${s[2]==="done"?"On time":s[2]==="now"?"Active":"Pending"}</span></div>`; })}</div></div>`;
}
function ScriptMock(){
  var j = [["07:00","Daily MIS PDF generated","ok","Done"],["07:05","Pending orders synced to dashboard","ok","Done"],["09:00","Stock below minimum: 3 items flagged","warn","Flagged"],["18:00","Overdue task summary","info","Scheduled"]];
  return html`<div className="mock"><div className="mock-bar"><span className="dots"><i></i><i></i><i></i></span><span className="fname">Automation run log</span></div>
    <div className="flow-mock">${j.map(function(x){ return html`<div className="job" key=${x[0]}><span className="t">${x[0]}</span><span>${x[1]}</span><span className=${"chip "+x[2]}>${x[3]}</span></div>`; })}</div></div>`;
}
function AppMock(){
  return html`<div className="phone" aria-hidden="true">
    <div className="phone-top"><span>Production Entry</span><${Icon} n="menu" s=${16}/></div>
    <div className="phone-body">
      <div className="pf"><label>Date</label><div>02 Nov 2026</div></div>
      <div className="pf"><label>Machine</label><div>Line 2 <${Icon} n="chev" s=${14}/></div></div>
      <div className="pf"><label>Operator</label><div>Operator 07 <${Icon} n="chev" s=${14}/></div></div>
      <div className="pf"><label>Quantity produced</label><div>480</div></div>
      <div className="pf"><label>Photo</label><div><span className="muted small">Attach photo</span><${Icon} n="camera" s=${16}/></div></div>
      <div className="phone-save">Save entry</div>
    </div></div>`;
}
function ServiceVisual(p){
  var v = p.kind, inner;
  if (v === "dashboard") inner = html`<${DashboardMock}/>`;
  else if (v === "register") inner = html`<${RegisterMock}/>`;
  else if (v === "flow") inner = html`<${FlowMock}/>`;
  else if (v === "script") inner = html`<${ScriptMock}/>`;
  else inner = html`<${AppMock}/>`;
  return html`<figure style=${{margin:0}} aria-label="Illustration using sample data">${inner}<figcaption className="sample-note">Illustrative sample data</figcaption></figure>`;
}
function HeroVisual(){
  return html`<div className="stack" role="img" aria-label="Illustration: an order register feeding a live owner dashboard, using sample data">
    <${RegisterMock} className="reg-card"/>
    <${DashboardMock} className="dash-card"/>
    <p className="sample-note">Illustrative sample data</p>
  </div>`;
}
function MiniViz(p){
  var k = p.kind;
  if (k === "bars") return html`<svg viewBox="0 0 200 90" aria-hidden="true">${[42,58,36,66,52,70,48,62].map(function(h,i){ return html`<rect key=${i} x=${8+i*24} y=${82-h} width="14" height=${h} className=${h>=55?"mv-a":"mv-b"}/>`; })}<line x1="4" x2="196" y1="27" y2="27" className="mv-k" strokeDasharray="4 3"/></svg>`;
  if (k === "line") return html`<svg viewBox="0 0 200 90" aria-hidden="true"><line x1="4" x2="196" y1="82" y2="82" className="mv-l"/><polyline points="6,70 32,62 58,66 84,48 110,52 136,34 162,38 194,18" className="mv-s"/>${[[84,48],[136,34],[194,18]].map(function(c,i){ return html`<circle key=${i} cx=${c[0]} cy=${c[1]} r="4" className="mv-a"/>`; })}</svg>`;
  if (k === "flow") return html`<svg viewBox="0 0 200 90" aria-hidden="true">${[0,1,2,3].map(function(i){ return html`<g key=${i}><rect x=${6+i*49} y="32" width="40" height="26" className=${i<2?"mv-a":"mv-c"}/>${i<3 && html`<line x1=${46+i*49} x2=${55+i*49} y1="45" y2="45" className="mv-k"/>`}</g>`; })}<rect x="6" y="70" width="88" height="5" className="mv-a"/><rect x="6" y="70" width="188" height="5" className="mv-c" opacity=".5"/></svg>`;
  if (k === "list") return html`<svg viewBox="0 0 200 90" aria-hidden="true">${[0,1,2,3].map(function(i){ return html`<g key=${i}><rect x="8" y=${8+i*20} width="12" height="12" className=${i<3?"mv-a":"mv-c"}/><rect x="30" y=${11+i*20} width=${[120,90,140,70][i]} height="6" className="mv-b"/></g>`; })}</svg>`;
  return html`<svg viewBox="0 0 200 90" aria-hidden="true"><rect x="4" y="6" width="192" height="14" className="mv-c"/>${[0,1,2,3].map(function(i){ return html`<g key=${i}><rect x="4" y=${26+i*15} width="192" height="1" className="mv-c"/><rect x="10" y=${30+i*15} width="40" height="5" className="mv-b"/><rect x="62" y=${30+i*15} width="70" height="5" className="mv-b"/><rect x="150" y=${30+i*15} width="36" height="5" className=${i===1?"mv-a":"mv-b"}/></g>`; })}</svg>`;
}
function industryName(slug){ var f = INDUSTRIES.filter(function(i){ return i.slug===slug; })[0]; return f ? f.name : slug; }
function ProjectCard(p){
  var x = p.item;
  return html`<article className="proj">
    <div className="proj-viz"><${Demo}>Demo<//><${MiniViz} kind=${x.viz}/></div>
    <div className="proj-body">
      <span className="eyebrow" style=${{fontSize:".66rem"}}>${industryName(x.industry)}</span>
      <h3 className="h3">${x.title}</h3>
      <p>${x.problem}</p>
      <div className="proj-meta">${x.tools.map(function(t){ return html`<span className="tag" key=${t}>${t}</span>`; })}</div>
    </div></article>`;
}
function ServiceCard(p){
  var s = p.s;
  return html`<${A} to=${s.route} className="card card-link">
    <span className="card-ic"><${Icon} n=${s.icon} s=${22}/></span>
    <h3 className="h3">${s.name}</h3><p>${s.short}</p>
    <span className="more">Learn more <${Icon} n="arrow" s=${16}/></span><//>`;
}
function StepsList(p){
  return html`<ol className=${"steps"+(p.four?" four":"")}>${p.items.map(function(s,i){ return html`<li key=${i}><h3 className="h3">${s[0]}</h3><p>${s[1]}</p></li>`; })}</ol>`;
}

/* ---------- 8. PAGES ---------- */
function HomePage(){
  var challenges = [["register","Paper registers and scattered files","Data sits in notebooks, personal Excel files and chat threads, so no one has the full picture."],
    ["clock","Reports that arrive too late","Month-end reports take days to compile, long after the chance to act has passed."],
    ["truck","No live view of orders","Order status lives in people's heads, and customers call before you know about a delay."],
    ["box","Stock that does not match","Book stock and physical stock differ, and nobody can say where the gap began."],
    ["tasks","Work that waits for follow-up","Tasks move only when someone calls to ask, and the same reminders repeat every day."],
    ["user","Owner involved in everything","Small decisions reach the owner because the information needed to decide is not visible."]];
  return html`<${React.Fragment}>
    <section className="hero" aria-labelledby="h-home"><div className="wrap hero-grid">
      <div className="hero-copy">
        <span className="eyebrow">MIS & Business Automation Studio</span>
        <h1 className="h1" id="h-home">Transform Your Business Operations with Smart MIS & Automation.</h1>
        <p className="lead">We help growing businesses organize their operations through structured MIS, automated workflows and actionable business dashboards.</p>
        <div className="actions">
          <${A} to="services" className="btn btn-primary">Explore Our Solutions <${Icon} n="arrow" s=${18}/><//>
          <${A} to="contact" className="btn btn-ghost">Book a Consultation<//>
        </div>
        <ul className="hero-tools" aria-label="Tools we build with"><li>Built with</li><li>Google Sheets</li><li>AppSheet</li><li>Apps Script</li><li>Looker Studio</li></ul>
      </div>
      <div style=${{minWidth:0}}><${HeroVisual}/></div>
    </div></section>

    <section className="section alt" aria-labelledby="h-ch"><div className="wrap">
      <${SectionHead} id="h-ch" eyebrow="Business challenges" title="Familiar problems in a growing business" lead="Most SMEs reach a point where the business has grown but the way information moves has not. These are the patterns we hear most often."/>
      <ul className="ruled">${challenges.map(function(c){ return html`<li key=${c[0]}><${Icon} n=${c[0]} s=${22}/><h3 className="h3">${c[1]}</h3><p>${c[2]}</p></li>`; })}</ul>
    </div></section>

    <section className="section" aria-labelledby="h-sv"><div className="wrap">
      <${SectionHead} id="h-sv" eyebrow="Our services" title="Six ways we structure your operations" lead="Each service can stand alone or combine into a complete MIS." action=${html`<${A} to="services" className="tlink">View all services <${Icon} n="arrow" s=${16}/><//>`}/>
      <div className="g3">${SERVICES.map(function(s){ return html`<${ServiceCard} key=${s.slug} s=${s}/>`; })}</div>
    </div></section>

    <section className="section band on-dark" aria-labelledby="h-in"><div className="wrap">
      <${SectionHead} id="h-in" eyebrow="Industries we serve" title="Built for how SMEs actually operate" lead="Systems designed around the records, stages and decisions specific to your type of business."/>
      <div className="g3">${INDUSTRIES.map(function(i){ return html`<${A} key=${i.slug} to=${i.route} className="ind-card">
        <${Icon} n=${i.icon} s=${28}/><h3 className="h3">${i.name}</h3>
        <ul>${i.systems.slice(0,4).map(function(s){ return html`<li key=${s[0]}>${s[0]}</li>`; })}</ul>
        <span className="more">Explore ${i.name} <${Icon} n="arrow" s=${16}/></span><//>`; })}</div>
    </div></section>

    <section className="section" aria-labelledby="h-hw"><div className="wrap">
      <${SectionHead} id="h-hw" eyebrow="How we work" title="From first call to a system your team uses" lead="A step-by-step process that starts with your business, not with a software template."/>
      <${StepsList} items=${STEPS}/>
    </div></section>

    <section className="section alt" aria-labelledby="h-fp"><div className="wrap">
      <${SectionHead} id="h-fp" eyebrow="Featured projects" title="The kind of systems we build" lead="Example concepts showing the systems we typically build. Client projects are published only with the client's permission." action=${html`<${A} to="portfolio" className="tlink">View portfolio <${Icon} n="arrow" s=${16}/><//>`}/>
      <div className="g3">${PORTFOLIO.slice(0,3).map(function(x){ return html`<${ProjectCard} key=${x.id} item=${x}/>`; })}</div>
    </div></section>

    <section className="section" aria-labelledby="h-why"><div className="wrap split2">
      <div style=${{display:"grid",gap:"16px"}} className="sticky">
        <span className="eyebrow">Why Data Craft Studio</span>
        <h2 className="h2" id="h-why">Practical systems, built around your process</h2>
        <p className="lead">We are a focused studio. Our work is limited to MIS and business automation, so every project gets attention to how your operations really run.</p>
        <div><${A} to="about" className="tlink">About the studio <${Icon} n="arrow" s=${16}/><//></div>
      </div>
      <ul className="principles">
        <li><h3 className="h3">Process before software</h3><p>We map how data moves in your business before choosing a tool or building a screen.</p></li>
        <li><h3 className="h3">Familiar tools</h3><p>Most systems run on Google Workspace, so your team works in tools that are easy to learn and widely supported.</p></li>
        <li><h3 className="h3">Built in modules</h3><p>Start with the area that hurts most, see it working, then extend. No large up-front rollout.</p></li>
        <li><h3 className="h3">Decision-focused dashboards</h3><p>Dashboards are designed around the decisions you make, with exceptions shown first.</p></li>
        <li><h3 className="h3">Documented handover</h3><p>Training for each role and written documentation, so the system does not depend on one person.</p></li>
      </ul>
    </div></section>

    <section className="section alt" aria-labelledby="h-faq"><div className="wrap">
      <${SectionHead} id="h-faq" eyebrow="FAQ" title="Frequently asked questions"/>
      <${Faq} items=${HOME_FAQS}/>
    </div></section>

    <${CtaBand} title="Ready to move beyond registers and spreadsheets?" secondary=${html`<${A} to="services" className="btn btn-ghost">Explore Our Solutions<//>`}/>
  <//>`;
}

function AboutPage(){
  return html`<${React.Fragment}>
    <${PageHero} crumbs=${[["Home","home"],["About Us","about"]]} eyebrow="About Us" title="A studio focused on MIS and business automation" lead="Data Craft Studio helps small and medium businesses replace manual registers and scattered spreadsheets with structured systems, automated workflows and clear dashboards."/>
    <section className="section"><div className="wrap split-aside">
      <div className="prose">
        <h2 className="h2" style=${{marginTop:0}}>Who we are</h2>
        <p>Data Craft Studio is an MIS and business automation studio. We work with manufacturers, traders and distributors, and service businesses that have grown faster than their information systems.</p>
        <p>Our work starts with a simple observation: most SMEs already have the data they need. It is written in registers, typed into spreadsheets and shared in messages. What is missing is structure. When data is recorded once, in the right place, by the right person, reports and decisions follow naturally.</p>
        <h2>What we believe</h2>
        <p>Good systems fit the business, not the other way round. A system that matches how people already work, with small improvements, gets used. A system that demands a new way of working overnight usually gets abandoned.</p>
        <p>We prefer practical tools such as Google Sheets, AppSheet and Apps Script because they are accessible, affordable to run and easy for a business to own.</p>
        <h2>What we do not do</h2>
        <ul><li>We do not resell packaged ERP or accounting software.</li><li>We do not build systems that only we can operate.</li><li>We do not publish client work or results without the client's permission.</li></ul>
      </div>
      <aside className="sticky" style=${{display:"grid",gap:"16px"}}>
        <div className="card">
          <span className="eyebrow">Founder-led studio</span>
          <h3 className="h3">You work directly with the person who builds your system</h3>
          <p>From the discovery call to handover, the same person maps your process, builds the system and trains your team. A detailed founder profile is coming soon.</p>
        </div>
        <div className="card">
          <span className="eyebrow">Tools we build with</span>
          <ul className="chips"><li>Google Sheets</li><li>AppSheet</li><li>Apps Script</li><li>Looker Studio</li></ul>
          <p className="muted small">Product names are trademarks of their respective owners.</p>
        </div>
      </aside>
    </div></section>
    <section className="section alt"><div className="wrap">
      <${SectionHead} eyebrow="How we work" title="Our working process"/>
      <${StepsList} items=${STEPS}/>
    </div></section>
    <section className="section tight"><div className="wrap g2">
      <${A} to="services" className="card card-link"><span className="eyebrow">Services</span><h3 className="h3">See what we build</h3><p>MIS, AppSheet apps, Sheets automation, Apps Script, dashboards and workflows.</p><span className="more">View services <${Icon} n="arrow" s=${16}/></span><//>
      <${A} to="industries" className="card card-link"><span className="eyebrow">Industries</span><h3 className="h3">See who we work with</h3><p>Manufacturing, trading and distribution, and service businesses.</p><span className="more">View industries <${Icon} n="arrow" s=${16}/></span><//>
    </div></section>
    <${CtaBand}/>
  <//>`;
}

function ServicesPage(){
  var guide = [["Data is scattered across registers and files","MIS Development","mis-development"],["Staff need to enter data from phones","AppSheet Solutions","appsheet-solutions"],["Your sheets are messy and full of copy-paste","Google Sheets Automation","google-sheets-automation"],["Reports and documents are prepared by hand","Google Apps Script Automation","google-apps-script-automation"],["You wait for someone to send you the numbers","Business Dashboards","business-dashboards"],["Work stalls between people and departments","Workflow Automation","workflow-automation"]];
  return html`<${React.Fragment}>
    <${PageHero} crumbs=${[["Home","home"],["Services","services"]]} eyebrow="Services" title="MIS and business automation services" lead="Six services that help SMEs record data once, automate repetitive work and see their business clearly. Each can stand alone or combine into a complete system."/>
    <section className="section"><div className="wrap"><div className="g3">${SERVICES.map(function(s){ return html`<${ServiceCard} key=${s.slug} s=${s}/>`; })}</div></div></section>
    <section className="section alt"><div className="wrap">
      <${SectionHead} eyebrow="Where to start" title="Not sure which service you need?" lead="Find the problem that sounds most familiar. That is usually the best place to begin."/>
      <div className="tbl-scroll" style=${{border:"1px solid var(--line)",background:"var(--surface-2)"}}>
        <table className="reg" style=${{fontFamily:"var(--f-body)",fontSize:".95rem"}}>
          <thead><tr><th scope="col">If this sounds familiar</th><th scope="col">Start with</th></tr></thead>
          <tbody>${guide.map(function(g){ return html`<tr key=${g[2]}><td style=${{whiteSpace:"normal",padding:"14px 16px"}}>${g[0]}</td><td style=${{padding:"14px 16px"}}><${A} to=${"service-"+g[2]} className="tlink">${g[1]} <${Icon} n="arrow" s=${14}/><//></td></tr>`; })}</tbody>
        </table></div>
    </div></section>
    <section className="section"><div className="wrap"><${SectionHead} eyebrow="How we work" title="One process for every service"/><${StepsList} items=${STEPS}/></div></section>
    <${CtaBand}/>
  <//>`;
}

function ServicePage(p){
  var s = p.s, others = SERVICES.filter(function(x){ return x.slug !== s.slug; }).slice(0,3);
  var inds = INDUSTRIES.filter(function(i){ return i.services.indexOf(s.slug) >= 0; });
  return html`<${React.Fragment}>
    <${PageHero} crumbs=${[["Home","home"],["Services","services"],[s.name,s.route]]} eyebrow="Service" title=${s.h1} lead=${s.short}>
      <div className="actions"><${A} to="contact" className="btn btn-primary" q=${"?service="+s.slug}>Enquire about this service<//><${A} to="services" className="btn btn-ghost">All services<//></div>
    <//>
    <section className="section" aria-labelledby="h-intro"><div className="wrap split2">
      <div className="prose"><span className="eyebrow">Introduction</span><h2 className="h2" id="h-intro">What this service covers</h2>${s.intro.map(function(t,i){ return html`<p key=${i}>${t}</p>`; })}</div>
      <div style=${{minWidth:0}}><${ServiceVisual} kind=${s.visual}/></div>
    </div></section>
    <section className="section alt" aria-labelledby="h-ps"><div className="wrap">
      <${SectionHead} id="h-ps" eyebrow="Problems and solutions" title="What it solves and how"/>
      <div className="two-lists">
        <div><h3 className="h3"><${Icon} n="alert" s=${20}/>Business problems addressed</h3><${Ticks} items=${s.problems} x=${true}/></div>
        <div><h3 className="h3"><${Icon} n="check" s=${20}/>Proposed solutions</h3><${Ticks} items=${s.solutions}/></div>
      </div>
    </div></section>
    <section className="section" aria-labelledby="h-cap"><div className="wrap">
      <${SectionHead} id="h-cap" eyebrow="Key capabilities" title=${"What "+s.name+" includes"}/>
      <div className="cap-grid">${s.capabilities.map(function(c,i){ return html`<div key=${i}><span className="idx">${String(i+1).padStart(2,"0")}</span><span>${c}</span></div>`; })}</div>
    </div></section>
    <section className="section alt tight" aria-labelledby="h-fit"><div className="wrap split2">
      <div style=${{display:"grid",gap:"14px"}}><span className="eyebrow">Suitable for</span><h2 className="h2" id="h-fit">Who this is for</h2><${Ticks} items=${s.suitable}/></div>
      <div style=${{display:"grid",gap:"14px",alignContent:"start"}}><span className="eyebrow">Related industries</span>
        <ul className="chips">${inds.map(function(i){ return html`<li key=${i.slug}><${A} to=${i.route} className="tlink">${i.name}<//></li>`; })}</ul>
        <p className="muted small">See how ${s.name.toLowerCase()} fits into a complete system on each industry page.</p></div>
    </div></section>
    <section className="section" aria-labelledby="h-ap"><div className="wrap">
      <${SectionHead} id="h-ap" eyebrow="Implementation approach" title="How we deliver it"/>
      <${StepsList} items=${s.approach} four=${true}/>
    </div></section>
    <section className="section alt" aria-labelledby="h-sfaq"><div className="wrap">
      <${SectionHead} id="h-sfaq" eyebrow="FAQ" title=${s.name+" questions"}/>
      <${Faq} items=${s.faqs}/>
    </div></section>
    <section className="section tight" aria-labelledby="h-rel"><div className="wrap">
      <${SectionHead} id="h-rel" eyebrow="Related services" title="Often combined with"/>
      <div className="g3">${others.map(function(o){ return html`<${ServiceCard} key=${o.slug} s=${o}/>`; })}</div>
    </div></section>
    <${CtaBand} title=${"Discuss your "+s.name.toLowerCase()+" requirement"} cta="Send an enquiry" service=${s.slug}/>
  <//>`;
}

function IndustriesPage(){
  return html`<${React.Fragment}>
    <${PageHero} crumbs=${[["Home","home"],["Solutions by Industry","industries"]]} eyebrow="Solutions by industry" title="Systems shaped by the way your industry works" lead="Manufacturers, traders and service businesses record different things and make different decisions. Our systems start from those differences."/>
    <section className="section"><div className="wrap" style=${{display:"grid",gap:"24px"}}>
      ${INDUSTRIES.map(function(i){ return html`<article key=${i.slug} className="card" style=${{padding:"32px",display:"grid",gridTemplateColumns:"minmax(0,1fr)",gap:"18px"}}>
        <div style=${{display:"flex",alignItems:"center",gap:"14px"}}><span className="card-ic"><${Icon} n=${i.icon} s=${24}/></span><h2 className="h2" style=${{fontSize:"1.6rem"}}>${i.name}</h2></div>
        <p style=${{maxWidth:"72ch"}}>${i.intro}</p>
        <ul className="chips">${i.systems.map(function(s){ return html`<li key=${s[0]}>${s[0]}</li>`; })}</ul>
        <div><${A} to=${i.route} className="btn btn-primary">Explore ${i.name} solutions <${Icon} n="arrow" s=${16}/><//></div>
      </article>`; })}
    </div></section>
    <section className="section alt tight"><div className="wrap"><${Notice} title="Different industry?">Many of the same building blocks, such as registers, flows, checklists and dashboards, apply to other types of businesses too. Describe your process on the <${A} to="contact">contact page<//> and we will tell you honestly whether we can help.<//></div></section>
    <${CtaBand}/>
  <//>`;
}

function IndustryPage(p){
  var i = p.ind, svcs = SERVICES.filter(function(s){ return i.services.indexOf(s.slug) >= 0; });
  return html`<${React.Fragment}>
    <${PageHero} crumbs=${[["Home","home"],["Industries","industries"],[i.name,i.route]]} eyebrow=${"Industry · "+i.name} title=${i.h1} lead=${i.intro}>
      <div className="actions"><${A} to="contact" className="btn btn-primary">Book a Consultation<//><${A} to="industries" className="btn btn-ghost">All industries<//></div>
    <//>
    <section className="section" aria-labelledby="h-ic"><div className="wrap split2">
      <div style=${{display:"grid",gap:"16px"}}><span className="eyebrow">Common challenges</span><h2 className="h2" id="h-ic">What we often see in ${i.name.toLowerCase()}</h2><${Ticks} items=${i.challenges} x=${true}/></div>
      <div style=${{minWidth:0}}><${ServiceVisual} kind=${i.slug==="manufacturing"?"dashboard":i.slug==="trading-distribution"?"register":"flow"}/></div>
    </div></section>
    <section className="section alt" aria-labelledby="h-is"><div className="wrap">
      <${SectionHead} id="h-is" eyebrow="Systems we build" title=${"Typical systems for "+i.name.toLowerCase()} lead="Each system can be built on its own or connected through shared masters into a complete MIS."/>
      <div className="g3">${i.systems.map(function(s){ return html`<div className="card" key=${s[0]}><h3 className="h3">${s[0]}</h3><p>${s[1]}</p></div>`; })}</div>
    </div></section>
    <section className="section" aria-labelledby="h-isv"><div className="wrap">
      <${SectionHead} id="h-isv" eyebrow="Relevant services" title="Services used for these systems"/>
      <div className="g4">${svcs.map(function(s){ return html`<${ServiceCard} key=${s.slug} s=${s}/>`; })}</div>
    </div></section>
    <section className="section alt" aria-labelledby="h-ifaq"><div className="wrap"><${SectionHead} id="h-ifaq" eyebrow="FAQ" title=${i.name+" questions"}/><${Faq} items=${i.faqs}/></div></section>
    <${CtaBand} title=${"Talk to us about your "+i.name.toLowerCase()+" operations"}/>
  <//>`;
}

function OurWorkPage(){
  var kinds = [["register","Registers to systems","Paper and spreadsheet registers rebuilt as structured data with validation and masters."],["phone","Data entry apps","Mobile forms and AppSheet apps for shop-floor, store and field teams."],["chart","Dashboards","Owner and department views built around decisions and exceptions."],["flow","Automated flows","Order flows, checklists, delegation and scheduled scripts that reduce follow-up."]];
  return html`<${React.Fragment}>
    <${PageHero} crumbs=${[["Home","home"],["Our Work","our-work"]]} eyebrow="Our Work" title="What we build for growing businesses" lead="Our work turns day-to-day operational records into systems that report on themselves. Here is an overview of the types of systems we build and how to explore them."/>
    <section className="section"><div className="wrap">
      <${SectionHead} eyebrow="Types of work" title="Four kinds of systems"/>
      <div className="g4">${kinds.map(function(k){ return html`<div className="card" key=${k[0]}><span className="card-ic"><${Icon} n=${k[0]} s=${22}/></span><h3 className="h3">${k[1]}</h3><p>${k[2]}</p></div>`; })}</div>
    </div></section>
    <section className="section alt"><div className="wrap">
      <${SectionHead} eyebrow="Before and after" title="From a register to a live dashboard" lead="The same records, entered once in a structured register, feed a dashboard that updates as work happens. Both views below use sample data."/>
      <div className="g2" style=${{alignItems:"start"}}>
        <figure style=${{margin:0,display:"grid",gap:"10px"}}><figcaption className="eyebrow">Before · structured register</figcaption><${RegisterMock}/></figure>
        <figure style=${{margin:0,display:"grid",gap:"10px"}}><figcaption className="eyebrow">After · owner dashboard</figcaption><${DashboardMock}/></figure>
      </div>
      <p className="sample-note">Illustrative sample data</p>
    </div></section>
    <section className="section"><div className="wrap">
      <${SectionHead} eyebrow="Explore" title="See the work in detail"/>
      <div className="g2">
        <${A} to="portfolio" className="card card-link"><span className="eyebrow">Portfolio</span><h3 className="h3">System concepts by industry</h3><p>Browse example concepts for production tracking, stock registers, order flows, collections and more.</p><span className="more">Open portfolio <${Icon} n="arrow" s=${16}/></span><//>
        <${A} to="case-studies" className="card card-link"><span className="eyebrow">Case studies</span><h3 className="h3">How a project unfolds</h3><p>Follow an illustrative project from context and challenge to approach and solution.</p><span className="more">Read case studies <${Icon} n="arrow" s=${16}/></span><//>
      </div>
      <div style=${{marginTop:"24px"}}><${Notice} title="About client work">We publish client projects only with written permission. The examples on these pages are labelled as illustrative concepts.<//></div>
    </div></section>
    <${CtaBand}/>
  <//>`;
}

function PortfolioPage(){
  var f = useState("all"), filt = f[0], setF = f[1];
  var opts = [["all","All"]].concat(INDUSTRIES.map(function(i){ return [i.slug, i.name]; }));
  var items = PORTFOLIO.filter(function(x){ return filt === "all" || x.industry === filt; });
  return html`<${React.Fragment}>
    <${PageHero} crumbs=${[["Home","home"],["Our Work","our-work"],["Portfolio","portfolio"]]} eyebrow="Portfolio" title="Portfolio of MIS and automation systems" lead="Example concepts showing the types of systems we build for manufacturers, traders and service businesses."/>
    <section className="section"><div className="wrap">
      <div style=${{marginBottom:"24px"}}><${Notice} title="Illustrative concepts">These cards show typical system designs, not specific client projects. No client names, logos or results are shown.<//></div>
      <div className="filters" role="group" aria-label="Filter by industry">
        ${opts.map(function(o){ return html`<button key=${o[0]} type="button" className="fbtn" aria-pressed=${filt===o[0]} onClick=${function(){ setF(o[0]); }}>${o[1]}</button>`; })}
        <span className="count" aria-live="polite">${items.length} ${items.length===1?"concept":"concepts"}</span>
      </div>
      <div className="g3">${items.map(function(x){ return html`<${ProjectCard} key=${x.id} item=${x}/>`; })}</div>
    </div></section>
    <${CtaBand} title="Have a system like this in mind?"/>
  <//>`;
}

function CaseStudiesPage(){
  var t = useState(0), tab = t[0], setTab = t[1];
  var c = CASES[tab];
  function onKey(e){ if (e.key==="ArrowRight"||e.key==="ArrowLeft"){ var n = (tab + (e.key==="ArrowRight"?1:-1) + CASES.length) % CASES.length; setTab(n); var b = document.getElementById("cs-tab-"+n); if (b) b.focus(); } }
  return html`<${React.Fragment}>
    <${PageHero} crumbs=${[["Home","home"],["Our Work","our-work"],["Case Studies","case-studies"]]} eyebrow="Case studies" title="Case studies" lead="How an MIS or automation project moves from problem to working system. Shown here through illustrative scenarios."/>
    <section className="section"><div className="wrap" style=${{display:"grid",gap:"24px"}}>
      <${Notice} title="Illustrative scenarios">These case studies are fictional and do not describe any specific client. We do not publish outcome figures unless they are measured and approved by the client.<//>
      <div className="filters" role="tablist" aria-label="Case studies" onKeyDown=${onKey} style=${{marginBottom:0}}>
        ${CASES.map(function(x,i){ return html`<button key=${x.id} id=${"cs-tab-"+i} type="button" role="tab" className="fbtn" aria-selected=${tab===i} aria-controls="cs-panel" tabIndex=${tab===i?0:-1} onClick=${function(){ setTab(i); }}>${x.tab}</button>`; })}
      </div>
      <article className="cs" id="cs-panel" role="tabpanel" aria-labelledby=${"cs-tab-"+tab}>
        <header className="cs-head"><${Demo}>Illustrative case study<//><h2 className="h2">${c.title}</h2></header>
        <div className="cs-facts">
          <div><span className="l">Industry</span><span>${c.industry}</span></div>
          <div><span className="l">Client</span><span>Illustrative scenario</span></div>
          <div><span className="l">Duration</span><span>Depends on scope</span></div>
          <div><span className="l">Tools</span><span>${c.tools.join(", ")}</span></div>
        </div>
        <div className="cs-body">
          <section className="cs-sec"><h3>Context</h3><div className="prose"><p>${c.context}</p></div></section>
          <section className="cs-sec"><h3>Challenge</h3><${Ticks} items=${c.challenge} x=${true}/></section>
          <section className="cs-sec"><h3>Approach</h3><ol className="prose" style=${{paddingLeft:"1.2em"}}>${c.approach.map(function(a,i){ return html`<li key=${i}>${a}</li>`; })}</ol></section>
          <section className="cs-sec"><h3>Solution</h3><${Ticks} items=${c.solution}/></section>
          <section className="cs-sec"><h3>What gets measured</h3><div style=${{display:"grid",gap:"12px"}}>
            <${Ticks} items=${c.measure}/>
            <p className="muted small">In real projects, these measures are agreed at the start and reviewed with the client after go-live.</p></div></section>
        </div>
      </article>
    </div></section>
    <${CtaBand}/>
  <//>`;
}

function ResourcesPage(){
  return html`<${React.Fragment}>
    <${PageHero} crumbs=${[["Home","home"],["Resources","resources"]]} eyebrow="Resources" title="Guides on MIS, automation and dashboards" lead="Practical articles for business owners deciding how to organise their data, choose tools and build useful reports."/>
    <section className="section"><div className="wrap">
      <div className="g3">${ARTICLES.map(function(a){ return html`<${A} key=${a.slug} to=${a.route} className="card card-link">
        <span className="eyebrow">${a.tag}</span><h2 className="h3">${a.title}</h2><p>${a.summary}</p>
        <span className="article-meta"><span>${a.mins} min read</span></span>
        <span className="more">Read article <${Icon} n="arrow" s=${16}/></span><//>`; })}</div>
    </div></section>
    <${CtaBand}/>
  <//>`;
}

function slugify(t){ return t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
function ArticlePage(p){
  var a = p.a, others = ARTICLES.filter(function(x){ return x.slug !== a.slug; });
  function jump(e, id){ e.preventDefault(); var el = document.getElementById(id); if (el) { el.scrollIntoView({behavior:"smooth", block:"start"}); el.setAttribute("tabindex","-1"); el.focus({preventScroll:true}); } }
  return html`<${React.Fragment}>
    <${PageHero} crumbs=${[["Home","home"],["Resources","resources"],[a.title,a.route]]} eyebrow=${a.tag} title=${a.title} lead=${a.summary}>
      <div className="article-meta"><span>By Data Craft Studio</span><span>${a.mins} min read</span></div>
    <//>
    <section className="section"><div className="wrap split-aside">
      <article className="prose">
        ${a.sections.map(function(s){ var id = "s-"+slugify(s.h); return html`<section key=${s.h} style=${{display:"grid",gap:"1em"}}>
          <h2 id=${id} style=${{scrollMarginTop:"96px"}}>${s.h}</h2>
          ${(s.p||[]).map(function(t,i){ return html`<p key=${"p"+i}>${t}</p>`; })}
          ${s.ul && html`<ul>${s.ul.map(function(t,i){ return html`<li key=${i}>${t}</li>`; })}</ul>`}
          ${s.ol && html`<ol>${s.ol.map(function(t,i){ return html`<li key=${i}>${t}</li>`; })}</ol>`}
        </section>`; })}
        <div style=${{marginTop:"1.5em"}}><${Notice} title="Need help applying this?">See our <${A} to="service-mis-development">MIS Development<//> and <${A} to="service-business-dashboards">Business Dashboards<//> services, or <${A} to="contact">send an enquiry<//>.<//></div>
      </article>
      <aside className="sticky" style=${{display:"grid",gap:"16px"}}>
        <nav className="toc" aria-label="On this page"><span className="eyebrow">On this page</span>
          <ol>${a.sections.map(function(s){ var id = "s-"+slugify(s.h); return html`<li key=${id}><a href=${"#"+id} onClick=${function(e){ jump(e, id); }}>${s.h}</a></li>`; })}</ol></nav>
        <div className="toc"><span className="eyebrow">More articles</span>
          <ul style=${{listStyle:"none",display:"grid",gap:"10px"}}>${others.map(function(o){ return html`<li key=${o.slug}><${A} to=${o.route} className="tlink" style=${{fontWeight:500}}>${o.title}<//></li>`; })}</ul></div>
      </aside>
    </div></section>
    <${CtaBand}/>
  <//>`;
}

/* ---------- 9. ENQUIRY FORM ---------- */
var EMPTY = { name:"", business:"", email:"", mobile:"", btype:"", service:"", desc:"", consent:false };
var LABELS = { name:"Name", business:"Business name", email:"Email", mobile:"Mobile number", btype:"Business type", service:"Service required", desc:"Requirement description", consent:"Privacy consent" };
var ORDER = ["name","business","email","mobile","btype","service","desc","consent"];
function validateEnquiry(v){
  var e = {};
  var name = v.name.trim();
  if (!name) e.name = "Enter your name.";
  else if (name.length < 2) e.name = "Name must be at least 2 characters.";
  if (!v.business.trim()) e.business = "Enter your business name.";
  var em = v.email.trim();
  if (!em) e.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) e.email = "Enter a valid email, for example name@company.com.";
  var mob = v.mobile.replace(/[\s\-()]/g, "");
  if (!mob) e.mobile = "Enter your mobile number.";
  else {
    var ind = mob.replace(/^(\+91|0091|0)/, "");
    var okIndia = /^[6-9]\d{9}$/.test(ind) && !/^\+(?!91)/.test(mob);
    var okIntl = /^\+(?!91)\d{8,15}$/.test(mob);
    if (!okIndia && !okIntl) e.mobile = "Enter a 10-digit Indian mobile number, or an international number starting with +.";
  }
  if (!v.btype) e.btype = "Select your business type.";
  if (!v.service) e.service = "Select the service you need.";
  var d = v.desc.trim();
  if (!d) e.desc = "Describe your requirement.";
  else if (d.length < 20) e.desc = "Add a little more detail (at least 20 characters).";
  else if (d.length > 1000) e.desc = "Keep the description under 1,000 characters.";
  if (!v.consent) e.consent = "Confirm that you have read the privacy policy.";
  return e;
}
function makeRef(){ var d = new Date(); function z(n){ return String(n).padStart(2,"0"); } return "DCS-" + String(d.getFullYear()).slice(2) + z(d.getMonth()+1) + z(d.getDate()) + "-" + Math.random().toString(36).slice(2,6).toUpperCase(); }
/* Submissions go to Netlify Forms (form "enquiry", registered via /__forms.html).
   Field names here must match that file exactly. */
function sendEnquiry(rec, honeypot){
  var body = new URLSearchParams({
    "form-name": "enquiry", "bot-field": honeypot || "",
    subject: "New enquiry " + rec.ref + " (" + rec.service + ")",
    ref: rec.ref, name: rec.name, business: rec.business, email: rec.email, mobile: rec.mobile,
    businessType: rec.businessType, service: rec.service, description: rec.description, consent: "yes"
  });
  return fetch("/", { method:"POST", headers:{ "Content-Type":"application/x-www-form-urlencoded" }, body: body.toString() })
    .then(function(r){ if (!r.ok) throw new Error("HTTP " + r.status); });
}

function EnquiryForm(){
  var s1 = useState(EMPTY), v = s1[0], setV = s1[1];
  var s2 = useState({}), err = s2[0], setErr = s2[1];
  var s3 = useState(false), tried = s3[0], setTried = s3[1];
  var s4 = useState(null), done = s4[0], setDone = s4[1];
  var s5 = useState(false), busy = s5[0], setBusy = s5[1];
  var s6 = useState(""), fail = s6[0], setFail = s6[1];
  var sumRef = useRef(null), doneRef = useRef(null), hpRef = useRef(null);
  useEffect(function(){
    var q = new URLSearchParams(location.search).get("service");
    if (q && (q === "not-sure" || SERVICES.some(function(s){ return s.slug === q; }))) setV(function(cur){ return Object.assign({}, cur, { service:q }); });
  }, []);
  useEffect(function(){ if (done && doneRef.current) doneRef.current.focus(); }, [done]);
  function upd(k){ return function(e){ var val = e.target.type === "checkbox" ? e.target.checked : e.target.value; var nv = Object.assign({}, v); nv[k] = val; setV(nv); if (tried) setErr(validateEnquiry(nv)); }; }
  function blur(k){ return function(){ if (tried) return; var e2 = validateEnquiry(v); if (v[k] !== "" && v[k] !== false && e2[k]) { var n = Object.assign({}, err); n[k] = e2[k]; setErr(n); } else if (!e2[k] && err[k]) { var n2 = Object.assign({}, err); delete n2[k]; setErr(n2); } }; }
  function submit(e){
    e.preventDefault(); setTried(true);
    var e2 = validateEnquiry(v); setErr(e2);
    if (Object.keys(e2).length){ setTimeout(function(){ if (sumRef.current) sumRef.current.focus(); }, 0); return; }
    setBusy(true); setFail("");
    var ref = makeRef();
    var svc = SERVICES.filter(function(s){ return s.slug === v.service; })[0];
    var rec = { ref:ref, name:v.name.trim(), business:v.business.trim(), email:v.email.trim(), mobile:v.mobile.trim(), businessType:v.btype, service: svc ? svc.name : "Not sure yet", description:v.desc.trim() };
    sendEnquiry(rec, hpRef.current ? hpRef.current.value : "")
      .then(function(){ setBusy(false); setDone({ ref:ref, name:rec.name, email:rec.email, service:rec.service }); })
      .catch(function(){ setBusy(false); setFail("Your enquiry could not be sent. Please check your connection and try again."); });
  }
  function reset(){ setV(Object.assign({}, EMPTY)); setErr({}); setTried(false); setDone(null); setFail(""); }
  function F(k){ return { id:"f-"+k, name:k, "aria-invalid": err[k] ? "true" : "false", "aria-describedby": [err[k] ? "e-"+k : null, (k==="mobile"||k==="desc") ? "h-"+k : null].filter(Boolean).join(" ") || undefined }; }
  function Err(k){ return err[k] ? html`<span className="err" id=${"e-"+k}><${Icon} n="alert" s=${15} w=${2}/>${err[k]}</span>` : null; }
  var errKeys = ORDER.filter(function(k){ return err[k]; });

  if (done) return html`<div className="success" role="status" tabIndex="-1" ref=${doneRef}>
    <span className="eyebrow" style=${{color:"var(--ok)"}}>Enquiry received</span>
    <h2 className="h2">Thank you, ${done.name}.</h2>
    <p>Your enquiry about <b>${done.service}</b> has reached our team. Your reference number is:</p>
    <span className="ref">${done.ref}</span>
    <${Notice} title="What happens next">We review every enquiry personally and reply to <b>${done.email}</b> to arrange a short discovery call. Please keep the reference number handy.<//>
    <div className="actions"><button type="button" className="btn btn-primary" onClick=${reset}>Submit another enquiry</button><${A} to="home" className="btn btn-ghost">Back to home<//></div>
  </div>`;

  return html`<form className="form-card" noValidate onSubmit=${submit} aria-labelledby="form-h">
    <div style=${{display:"grid",gap:"6px"}}><h2 className="h2" id="form-h" style=${{fontSize:"1.5rem"}}>Send an enquiry</h2><p className="muted small">Fields marked <span className="req">*</span> are required.</p></div>
    ${tried && errKeys.length > 0 && html`<div className="err-summary" role="alert" tabIndex="-1" ref=${sumRef}>
      <b>Please fix ${errKeys.length} ${errKeys.length===1?"field":"fields"} before submitting:</b>
      <ul>${errKeys.map(function(k){ return html`<li key=${k}><a href=${"#f-"+k} onClick=${function(e){ e.preventDefault(); var el = document.getElementById("f-"+k); if (el) el.focus(); }}>${LABELS[k]}: ${err[k]}</a></li>`; })}</ul></div>`}
    <div className="hp" aria-hidden="true"><label>Leave this field empty <input name="bot-field" tabIndex="-1" autoComplete="off" ref=${hpRef}/></label></div>
    <div className="form">
      <div className="field"><label htmlFor="f-name">Name<span className="req">*</span></label><input className="input" type="text" autoComplete="name" value=${v.name} onChange=${upd("name")} onBlur=${blur("name")} ...${F("name")}/>${Err("name")}</div>
      <div className="field"><label htmlFor="f-business">Business name<span className="req">*</span></label><input className="input" type="text" autoComplete="organization" value=${v.business} onChange=${upd("business")} onBlur=${blur("business")} ...${F("business")}/>${Err("business")}</div>
      <div className="field"><label htmlFor="f-email">Email<span className="req">*</span></label><input className="input" type="email" autoComplete="email" inputMode="email" value=${v.email} onChange=${upd("email")} onBlur=${blur("email")} ...${F("email")}/>${Err("email")}</div>
      <div className="field"><label htmlFor="f-mobile">Mobile number<span className="req">*</span></label><input className="input" type="tel" autoComplete="tel" inputMode="tel" placeholder="98765 43210" value=${v.mobile} onChange=${upd("mobile")} onBlur=${blur("mobile")} ...${F("mobile")}/><span className="hint" id="h-mobile">10-digit Indian number, or international with +country code</span>${Err("mobile")}</div>
      <div className="field"><label htmlFor="f-btype">Business type<span className="req">*</span></label><select className="input" value=${v.btype} onChange=${upd("btype")} ...${F("btype")}><option value="">Select business type</option>${BTYPES.map(function(b){ return html`<option key=${b} value=${b}>${b}</option>`; })}</select>${Err("btype")}</div>
      <div className="field"><label htmlFor="f-service">Service required<span className="req">*</span></label><select className="input" value=${v.service} onChange=${upd("service")} ...${F("service")}><option value="">Select a service</option>${SERVICES.map(function(s){ return html`<option key=${s.slug} value=${s.slug}>${s.name}</option>`; })}<option value="not-sure">Not sure yet, need advice</option></select>${Err("service")}</div>
      <div className="field full"><label htmlFor="f-desc">Requirement description<span className="req">*</span></label><textarea className="input" rows="6" placeholder="Briefly describe your business, how you track this work today, and what you would like to improve." value=${v.desc} onChange=${upd("desc")} onBlur=${blur("desc")} ...${F("desc")}></textarea>
        <span className="hint" id="h-desc"><span>At least 20 characters</span><span style=${{color: v.desc.length>1000?"var(--err)":undefined}}>${v.desc.length} / 1000</span></span>${Err("desc")}</div>
      <div className="field full"><label className="check" htmlFor="f-consent"><input type="checkbox" checked=${v.consent} onChange=${upd("consent")} ...${F("consent")}/><span>I have read the <${A} to="privacy-policy">Privacy Policy<//> and agree to be contacted about this enquiry.<span className="req">*</span></span></label>${Err("consent")}</div>
    </div>
    ${fail && html`<div className="err-summary" role="alert"><b>${fail}</b></div>`}
    <div className="actions" style=${{alignItems:"center"}}>
      <button type="submit" className="btn btn-primary" disabled=${busy}>${busy ? "Submitting…" : "Submit enquiry"}</button>
      <span className="muted small">We usually reply within one to two working days.</span>
    </div>
  </form>`;
}

function ContactPage(){
  return html`<${React.Fragment}>
    <${PageHero} crumbs=${[["Home","home"],["Contact Us","contact"]]} eyebrow="Contact Us" title="Contact Data Craft Studio" lead="Tell us about your business and what you want to improve. We will review your requirement and suggest a practical next step."/>
    <section className="section"><div className="wrap split-aside">
      <div style=${{minWidth:0}}><${EnquiryForm}/></div>
      <aside className="sticky" style=${{display:"grid",gap:"20px"}}>
        <div className="card" style=${{gap:"16px"}}>
          <span className="eyebrow">What happens next</span>
          <ol className="steps" style=${{gridTemplateColumns:"minmax(0,1fr)",borderTop:0}}>
            ${[["We review your enquiry","We read your requirement and note any questions."],["Discovery call","A short call to understand your process and priorities."],["Scope and quotation","A written scope, timeline and quotation for the first step."]].map(function(s){ return html`<li key=${s[0]} style=${{padding:"0 0 18px",borderBottom:0}}><h3 className="h3" style=${{fontSize:"1rem"}}>${s[0]}</h3><p>${s[1]}</p></li>`; })}
          </ol>
        </div>
        <div className="card">
          <span className="eyebrow">Contact details</span>
          <ul className="contact-list">
            <li><${Icon} n="mail" s=${18}/><div><span className="l">Email</span><div>${SITE.emailHref ? html`<a href=${SITE.emailHref}>${SITE.email}</a>` : SITE.email}</div></div></li>
            <li><${Icon} n="phone" s=${18}/><div><span className="l">Phone</span><div>${SITE.phoneHref ? html`<a href=${SITE.phoneHref}>${SITE.phone}</a>` : SITE.phone}</div></div></li>
            <li><${Icon} n="pin" s=${18}/><div><span className="l">Address</span><div>${SITE.address}</div></div></li>
            <li><${Icon} n="clock" s=${18}/><div><span className="l">Hours</span><div>${SITE.hours}</div></div></li>
          </ul>
          <span className="eyebrow" style=${{display:"block",marginTop:"20px"}}>Follow us</span>
          <${Social} className="social-light"/>
        </div>
      </aside>
    </div></section>
  <//>`;
}

var PRIVACY = [
  {h:"Who we are",p:["This website is operated by Data Craft Studio. In this policy, \"we\" and \"us\" refer to Data Craft Studio."]},
  {h:"Information we collect",p:["When you submit the enquiry form, we collect the details you provide: your name, business name, email address, mobile number, business type, the service you are interested in, and your requirement description."],ul:["Information you enter in forms","Basic technical data, such as IP address and browser type, that our hosting provider records in server logs to keep the site secure. We do not run analytics or advertising trackers."]},
  {h:"How we use your information",ul:["To respond to your enquiry and discuss your requirement","To prepare a scope or quotation you have asked for","To keep a record of communication related to your enquiry","To meet legal or regulatory obligations"],p:["We do not sell your personal information."]},
  {h:"Legal basis and consent",p:["We process enquiry information with your consent, given when you submit the form, and to take steps you request before entering into an agreement. We handle personal data in line with applicable data protection law, including India's Digital Personal Data Protection Act, 2023, where it applies."]},
  {h:"Sharing",p:["We share information only with service providers who help us operate the business, and only as needed. Our website and enquiry form are hosted by Netlify, which processes form submissions on our behalf."]},
  {h:"Retention",p:["We keep enquiry information only for as long as needed to respond to you and manage any resulting engagement, or longer if required by law."]},
  {h:"Your rights",p:["You may ask to access, correct or delete your personal information, or withdraw consent, by sending a request through the enquiry form on our Contact page."]},
  {h:"Cookies and local storage",p:["This site does not set tracking or advertising cookies. If analytics or cookies are added later, this section will be updated and consent obtained where required."]},
  {h:"Changes to this policy",p:["We may update this policy. The latest version will always be available on this page. Last updated: November 2026."]}
];
var TERMS = [
  {h:"About these terms",p:["These terms govern your use of the Data Craft Studio website. By using the site, you agree to them."]},
  {h:"Website content",p:["Content on this site is provided for general information about our services. It is not professional advice for your specific situation. Demonstration content, including portfolio concepts and case studies marked as demonstrations, is illustrative and does not describe real clients or results."]},
  {h:"Services and quotations",p:["Information about services on this site is not an offer. Any engagement is governed by a separate written proposal or agreement covering scope, fees, timelines and ownership."]},
  {h:"Intellectual property",p:["The site's design, text and graphics belong to Data Craft Studio unless stated otherwise. Product names such as Google Sheets, AppSheet, Google Apps Script and Looker Studio are trademarks of their respective owners and are used only to describe compatibility."]},
  {h:"Acceptable use",ul:["Do not submit false or misleading information through the forms","Do not attempt to disrupt or gain unauthorised access to the site","Do not copy site content for commercial use without permission"]},
  {h:"Limitation of liability",p:["To the extent permitted by law, Data Craft Studio is not liable for losses arising from use of this website or reliance on its general information."]},
  {h:"Third-party links",p:["The site may link to third-party websites. We are not responsible for their content or practices."]},
  {h:"Governing law",p:["These terms are governed by the laws of India."]},
  {h:"Contact",p:["Questions about these terms can be sent through the enquiry form on our Contact page."]}
];
function LegalPage(p){
  return html`<${React.Fragment}>
    <${PageHero} crumbs=${[["Home","home"],[p.label,p.route]]} eyebrow="Legal" title=${p.label} lead=${p.lead}/>
    <section className="section"><div className="wrap" style=${{display:"grid",gap:"28px"}}>
      <div className="prose">${p.sections.map(function(s,i){ return html`<section key=${i} style=${{display:"grid",gap:".8em"}}>
        <h2>${(i+1)+". "+s.h}</h2>
        ${(s.p||[]).map(function(t,j){ return html`<p key=${j}>${renderPh(t)}</p>`; })}
        ${s.ul && html`<ul>${s.ul.map(function(t,j){ return html`<li key=${j}>${renderPh(t)}</li>`; })}</ul>`}
      </section>`; })}</div>
    </div></section>
  <//>`;
}
function renderPh(t){ var parts = t.split(/(\[[^\]]+\])/g); return parts.map(function(x,i){ return /^\[.*\]$/.test(x) ? html`<span key=${i} className="ph">${x}</span>` : x; }); }

function NotFoundPage(p){
  return html`<section className="wrap nf" aria-labelledby="h-nf">
    <span className="nf-cell">#REF! · Page not found</span>
    <span className="nf-code" aria-hidden="true">404</span>
    <h1 className="h1" id="h-nf" style=${{fontSize:"clamp(1.8rem,3.6vw,2.6rem)"}}>This page could not be found</h1>
    <p className="lead">The link may be out of date, or the address may have a typing error. These pages might help:</p>
    <div className="actions"><${A} to="home" className="btn btn-primary">Go to home<//><${A} to="services" className="btn btn-ghost">View services<//><${A} to="contact" className="btn btn-ghost">Contact us<//></div>
  </section>`;
}

/* ---------- 10. ROUTE TABLE ---------- */
var R = {};
function def(route, o){ R[route] = Object.assign({ route:route }, o); }
def("home", { path:"/", title:"Data Craft Studio | MIS & Business Automation for SMEs", desc:"Data Craft Studio builds MIS, Google Sheets and AppSheet systems, Apps Script automations and business dashboards for small and medium businesses.", C:HomePage, faqs:HOME_FAQS });
def("about", { path:"/about/", title:"About Data Craft Studio | MIS & Automation Studio", desc:"Data Craft Studio is an MIS and business automation studio helping SMEs replace registers and scattered spreadsheets with structured, documented systems.", crumbs:[["Home","home"],["About Us","about"]], C:AboutPage });
def("services", { path:"/services/", title:"MIS & Business Automation Services | Data Craft Studio", desc:"MIS development, AppSheet apps, Google Sheets and Apps Script automation, business dashboards and workflow automation for small and medium businesses.", crumbs:[["Home","home"],["Services","services"]], C:ServicesPage });
SERVICES.forEach(function(s){ def(s.route, { path:s.path, title:s.title, desc:s.desc, crumbs:[["Home","home"],["Services","services"],[s.name,s.route]], C:ServicePage, props:{ s:s }, service:s, faqs:s.faqs }); });
def("industries", { path:"/industries/", title:"MIS & Automation Solutions by Industry | Data Craft Studio", desc:"MIS and automation solutions for manufacturing, trading and distribution, and service businesses, built around each industry's records and decisions.", crumbs:[["Home","home"],["Solutions by Industry","industries"]], C:IndustriesPage });
INDUSTRIES.forEach(function(i){ def(i.route, { path:i.path, title:i.title, desc:i.desc, crumbs:[["Home","home"],["Industries","industries"],[i.name,i.route]], C:IndustryPage, props:{ ind:i }, faqs:i.faqs }); });
def("our-work", { path:"/our-work/", title:"Our Work | MIS, Apps & Dashboards | Data Craft Studio", desc:"The types of systems Data Craft Studio builds: structured registers, data entry apps, dashboards and automated workflows for growing businesses.", crumbs:[["Home","home"],["Our Work","our-work"]], C:OurWorkPage });
def("portfolio", { path:"/portfolio/", title:"Portfolio | MIS & Automation Systems | Data Craft Studio", desc:"Portfolio of MIS and automation system concepts for manufacturing, trading and service businesses, including dashboards, stock registers and order flows.", crumbs:[["Home","home"],["Our Work","our-work"],["Portfolio","portfolio"]], C:PortfolioPage });
def("case-studies", { path:"/case-studies/", title:"Case Studies | MIS & Workflow Projects | Data Craft Studio", desc:"Case studies showing how MIS and workflow automation projects move from business problem to working system, covering context, approach and solution.", crumbs:[["Home","home"],["Our Work","our-work"],["Case Studies","case-studies"]], C:CaseStudiesPage });
def("resources", { path:"/resources/", title:"Resources & Guides on MIS and Automation | Data Craft Studio", desc:"Practical guides for SME owners on moving from registers to MIS, choosing between AppSheet and Apps Script, and designing useful dashboards.", crumbs:[["Home","home"],["Resources","resources"]], C:ResourcesPage });
ARTICLES.forEach(function(a){ def(a.route, { path:a.path, title:(a.seoTitle||a.title)+" | Data Craft Studio", desc:a.desc, crumbs:[["Home","home"],["Resources","resources"],[a.title,a.route]], C:ArticlePage, props:{ a:a }, article:a, ogType:"article" }); });
def("contact", { path:"/contact/", title:"Contact Us | Book a Consultation | Data Craft Studio", desc:"Contact Data Craft Studio to discuss MIS, AppSheet, Google Sheets, Apps Script, dashboard or workflow automation requirements for your business.", crumbs:[["Home","home"],["Contact Us","contact"]], C:ContactPage });
def("privacy-policy", { path:"/privacy-policy/", title:"Privacy Policy | Data Craft Studio", desc:"How Data Craft Studio collects, uses and protects information submitted through this website, including enquiry form details.", crumbs:[["Home","home"],["Privacy Policy","privacy-policy"]], C:LegalPage, props:{ label:"Privacy Policy", route:"privacy-policy", lead:"How we collect, use and protect information you share through this website.", sections:PRIVACY } });
def("terms-and-conditions", { path:"/terms-and-conditions/", title:"Terms & Conditions | Data Craft Studio", desc:"Terms and conditions for using the Data Craft Studio website, including content, intellectual property, acceptable use and liability.", crumbs:[["Home","home"],["Terms & Conditions","terms-and-conditions"]], C:LegalPage, props:{ label:"Terms & Conditions", route:"terms-and-conditions", lead:"The terms that apply when you use this website.", sections:TERMS } });
var PATHS = {}; Object.keys(R).forEach(function(k){ PATHS[R[k].path] = k; });
var NOT_FOUND = { route:"404", path:"/404/", title:"Page Not Found | Data Craft Studio", desc:"The page you are looking for could not be found.", C:NotFoundPage, noindex:true };

/* ---------- 11. APP SHELL ---------- */
function Shell(p){
  var route = p.route, page = R[route] || NOT_FOUND;
  var props = Object.assign({ route:route }, page.props || {});
  function skip(){ var m = document.getElementById("main"); if (m){ m.setAttribute("tabindex","-1"); m.focus(); } }
  return html`<${RouteCtx.Provider} value=${route}>
    <button type="button" className="skip" onClick=${skip}>Skip to content</button>
    <${Header} route=${route}/>
    <main id="main" key=${route}><${page.C} ...${props}/></main>
    <${Footer}/>
  <//>`;
}
function App(){
  var route = useRoute(), first = useRef(true);
  useEffect(function(){
    applySeo(R[route] || NOT_FOUND);
    if (first.current){ first.current = false; return; }
    window.scrollTo(0, 0);
    var h = document.querySelector("main h1"); if (h){ h.setAttribute("tabindex","-1"); h.focus({ preventScroll:true }); }
  }, [route]);
  return html`<${Shell} route=${route}/>`;
}

window.DCS = { R:R, Shell:Shell, html:html, SITE:SITE, NOT_FOUND:NOT_FOUND, buildLd:buildLd };
if (typeof document !== "undefined" && document.getElementById("root") && ReactDOM && ReactDOM.hydrateRoot){
  /* Old prototype links used hash routes (e.g. /#services); send them to the clean URL. */
  var legacy = location.hash.replace(/^#/, "");
  if (legacy && R[legacy] && (location.pathname === "/" || location.pathname === "/index.html")) location.replace(R[legacy].path);
  else ReactDOM.hydrateRoot(document.getElementById("root"), html`<${App}/>`);
}
})();
