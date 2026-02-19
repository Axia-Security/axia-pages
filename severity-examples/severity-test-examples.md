# AXIA Severity Classification Test Suite

**Version:** 1.0
**Date:** 2026-02-19
**Purpose:** 50 email-based insider risk scenarios for LLM severity classification testing
**Framework:** WHO sent it · WHAT it contains · WHO received it

---

## Severity Definitions

| Severity | Risk Score | Response | Playbook |
|----------|-----------|----------|----------|
| **Critical** | 90-100 | Preserve evidence, Notify Legal, Escalate to CISO | Immediate human confirmation required |
| **High** | 70-89 | Notify manager, Preserve evidence | Manager-level review and action |
| **Medium** | 50-69 | Coach employee | Educational engagement, process correction |
| **Low** | 0-49 | Auto-resolve if matches known-good pattern | Verify and close |

---

## Example 1: Pre-Departure Source Code Exfiltration

**Severity: CRITICAL**

### Sender Context
- **Name:** Marcus Chen
- **Role:** Senior Software Engineer
- **Department:** Engineering
- **Tenure:** 4 years (joined Jan 2020)
- **Risk Factors:** Submitted resignation 14 days ago. Accepted offer at DirectCompete Inc. (direct competitor). Key contributor to authentication module. LinkedIn updated to "Open to opportunities" 3 weeks ago.

### Email

**From:** marcus.chen@globalbank.com
**To:** marcus.chen.dev@gmail.com
**Date:** Tuesday, Feb 18, 2026, 11:47 PM
**Subject:** Backup - project files

Hi,

Sending myself the latest project files before my last day. Here is what I need to keep for reference:

auth-module/
  oauth2-handler.ts (our custom token refresh logic)
  session-manager.ts
  credential-vault.ts (AES-256 key rotation)
  fraud-detection/
    transaction-scorer.py (real-time scoring engine)
    pattern-recognizer.py (behavioral baseline algorithm)
    model_weights_v3.pkl
    feature_engineering.py

47 files total, 12,400 lines. These are the modules I built over the past 3 years, especially the fraud detection pipeline and the auth credential handling logic.

Thanks,
Marcus


### Why This Severity

AXIA's WHO/WHAT/WHO analysis: **WHO** — Departing engineer joining a direct competitor, 340% volume increase in data access over last 5 days. **WHAT** — Proprietary source code containing trade secrets (fraud detection algorithms, auth modules with embedded credentials). **WHO received** — Personal Gmail account, not a known vendor or partner. The combination of departure timing, competitor destination, sensitive content type, and personal email destination makes this unambiguously Critical. A DLP tool would see "engineer emails code" — AXIA sees a departing employee systematically collecting IP before joining a competitor.

---

## Example 2: Encrypted Archive Bypassing DLP

**Severity: CRITICAL**

### Sender Context
- **Name:** David Park
- **Role:** Product Manager
- **Department:** Product
- **Tenure:** 4.5 years (joined Aug 2021)
- **Risk Factors:** First time sending encrypted file externally. Recipient domain not in CRM or approved vendor list.

### Recipient Context
- **Name:** Jennifer Wu
- **Organization:** TechVentures Capital (VC firm)
- **Relationship:** No prior business relationship in CRM. Not on approved external contacts list.

### Email

**From:** david.park@neofinance.io
**To:** jennifer.wu@techventures-capital.com
**Date:** Wednesday, Feb 19, 2026, 9:35 AM
**Subject:** Following up - materials for review

Hi Jennifer,

Great speaking with you yesterday. As discussed, here are the materials you requested. I have encrypted the file with the password I mentioned on the call.

Contents include:
- 2026 Product Roadmap (full, with competitive response plans)
- Feature timeline through Q4 with release dates
- Pricing strategy revision for enterprise tier
- Competitive positioning analysis vs. Stripe, Adyen, and Checkout.com

Password is the one from our conversation. Did not want to include it in writing.

Best,
David


### Why This Severity

**WHO** — Product Manager with roadmap access, first-ever encrypted external file share. **WHAT** — Password-protected archive explicitly named "product-roadmap-2026," containing strategic plans, feature timelines, and competitive positioning. Encryption specifically defeats content scanning. **WHO received** — VC firm with no existing business relationship. This could indicate unauthorized fundraising discussions, competitive intelligence sharing, or preparation for departure to a VC-backed competitor. The deliberate encryption to bypass DLP controls elevates this from High to Critical.

---

## Example 3: M&A Documents Shared Before Board Approval

**Severity: CRITICAL**

### Sender Context
- **Name:** Jonathan Burke
- **Role:** VP Corporate Development
- **Department:** Finance
- **Tenure:** 6.5 years (joined Sep 2019)
- **Risk Factors:** Pre-board approval sharing. M&A confidential data. Has authority for M&A work but not for pre-approval disclosure.

### Recipient Context
- **Name:** Richard Stevens
- **Organization:** Stevens & Partners (external M&A advisory firm)
- **Relationship:** Previously engaged on two completed deals. Current engagement not yet formally approved by board.

### Email

**From:** jonathan.burke@meridianbank.com
**To:** r.stevens@stevenspartners.com
**CC:** lisa.wang@stevenspartners.com
**Date:** Monday, Feb 17, 2026, 12:50 PM
**Subject:** Project Falcon - preliminary analysis

Richard,

Following our conversation last week, here is the preliminary analysis for Project Falcon.

Target: Vertex Financial Solutions
Estimated valuation: ~$340M (12.8x revenue multiple)
Synergy model: $47M annual cost savings by Year 3
Integration timeline: 18 months, three phases
Key risk: Their Series C investors have anti-dilution provisions

Full 48-page analysis covers target financials, synergy models, valuation scenarios, and integration plan. We would like your team's independent assessment before we present to the board next Thursday.

Please keep this strictly confidential and do not share beyond your immediate deal team.

Regards,
Jonathan Burke
VP Corporate Development
Meridian Bank


### Why This Severity

**WHO** — VP Corp Dev, authorized for M&A work but sharing BEFORE board approval of outside counsel engagement. **WHAT** — Material non-public information (MNPI): acquisition target at $340M, internal valuation models, strategic intent. Premature disclosure could trigger SEC Regulation FD requirements, affect stock prices, or alert the target. **WHO received** — External advisor not yet formally engaged. Even though the relationship is legitimate, the timing creates regulatory and strategic risk. The MNPI exposure and potential SEC implications make this Critical regardless of the sender's seniority.

---

## Example 4: Pre-Earnings Financial Data to Investment Firm

**Severity: CRITICAL**

### Sender Context
- **Name:** Fiona Mitchell
- **Role:** Finance Manager
- **Department:** Finance
- **Tenure:** 5.5 years (joined Jun 2020)
- **Risk Factors:** No external communication authority. Sending pre-release financials during quiet period. Personal relationship with recipient (university alumni network).

### Recipient Context
- **Name:** Robert Hayes
- **Organization:** AlphaHedge Partners (hedge fund)
- **Relationship:** Not on Investor Relations approved contact list. Personal connection through university alumni network.

### Email

**From:** fiona.mitchell@swiftpay.com
**To:** robert.hayes@alphahedge-partners.com
**Date:** Tuesday, Feb 18, 2026, 7:20 AM
**Subject:** Quick look - Q4 numbers

Hey Rob,

Here's a preview of where Q4 landed. Revenue came in 12% above street estimates. Don't share this obviously — earnings call is Thursday morning.

Let's catch up at the alumni dinner next month.

Fiona


### Why This Severity

**WHO** — Finance Manager with access to pre-release earnings but NO authority for external communication. Personal relationship with recipient suggests this isn't a business process failure but a deliberate selective disclosure. **WHAT** — Pre-release Q4 earnings data during quiet period, including specific revenue figures that beat analyst estimates. This is textbook insider information. **WHO received** — Hedge fund manager, connected through personal network, not on IR contact list. This scenario represents potential insider trading facilitation under SEC Regulation FD. Legal and compliance must be immediately notified. The regulatory exposure alone makes this Critical.

---

## Example 5: Wire Transfer Instructions Modification (Banking)

**Severity: CRITICAL**

### Sender Context
- **Name:** Thomas Reed
- **Role:** Treasury Operations Analyst
- **Department:** Treasury & Payments
- **Tenure:** 2 years (joined Feb 2024)
- **Risk Factors:** Recently passed over for promotion. Accessed wire template library outside normal hours (2:14 AM). First time modifying beneficiary details for this client relationship.

### Recipient Context
- **Name:** Operations Team (internal distribution)
- **Organization:** Same bank — Wire Processing Unit

### Email

**From:** thomas.reed@centraltrustbank.com
**To:** wire-processing@centraltrustbank.com
**CC:** ops-manager@centraltrustbank.com
**Date:** Wednesday, Feb 19, 2026, 2:37 AM
**Subject:** URGENT: Updated beneficiary details - Henderson Industries wire

Team,

Henderson Industries has notified us of updated beneficiary banking details for the recurring monthly wire (ref: WT-2026-00847). Please update the standing instructions effective immediately:

New beneficiary: Henderson Industries LLC
New bank: First Caribbean International Bank
Account: 8847291034
SWIFT: FCIBBSNA

The client confirmed these changes by phone this afternoon. I've attached the updated authorization form. Please process the February wire using these new details.

Thanks,
Thomas Reed
Treasury Operations


### Why This Severity

**WHO** — Junior Treasury analyst acting outside normal hours (2:37 AM), recently passed over for promotion, first time modifying this client's beneficiary details. **WHAT** — Wire transfer instruction modification redirecting funds to an offshore account (Caribbean). The authorization form was created minutes before the email, suggesting fabrication rather than genuine client instruction. **WHO received** — Internal wire processing team. The intent appears to be fraudulent redirection of client funds via business email compromise pattern executed from the inside. This combines financial fraud risk, insider threat signals (promotion grievance, off-hours activity), and potential regulatory reporting obligations (SAR filing). Maximum severity.

---

## Example 6: Trading Algorithm Source Code (Fintech)

**Severity: CRITICAL**

### Sender Context
- **Name:** Dr. Lena Volkov
- **Role:** Lead Quantitative Researcher
- **Department:** Systematic Trading
- **Tenure:** 3 years (joined Mar 2023)
- **Risk Factors:** Updated LinkedIn to "Exploring new opportunities" 5 days ago. Has been in contact with a competing quant fund recruiter (detected via calendar entry "Coffee with Sarah - Citadel"). Filed patent application for signal processing technique 8 months ago (company IP).

### Email

**From:** lena.volkov@quantumtrade.io
**To:** lena.v.research@protonmail.com
**Date:** Monday, Feb 17, 2026, 10:23 PM
**Subject:** Research backup

Backing up my research notebooks before the laptop refresh next week. These are the core strategy files:

momentum_signal_generator.py - live production signal pipeline
mean_reversion_v4.ipynb - current mean reversion strategy (Sharpe 2.4)
pairs_trading_params.json - all active pair weightings and entry/exit thresholds
backtest_framework/run_strategy.py - backtesting engine with slippage model
position_sizing_model.pkl - trained ML model for dynamic position sizing
live_parameters.yaml - PRODUCTION parameters including current position limits, risk budgets, and execution timing windows

34 notebooks total with all proprietary strategies, signal generation logic, and live model parameters.


### Why This Severity

**WHO** — Lead quant researcher showing active departure signals (LinkedIn update, recruiter meetings with direct competitor Citadel). Filed a company patent — knows exactly which IP is most valuable. **WHAT** — Production trading algorithms, live model parameters, and proprietary signal generation logic. This is the core competitive advantage of a quantitative trading firm. Leakage could directly enable a competitor to replicate strategies worth potentially hundreds of millions. **WHO received** — ProtonMail (encrypted, untraceable personal email). The "laptop refresh" excuse is a common pretext for pre-departure data collection. The combination of departure signals + competitor contact + core IP + anonymous email service = maximum severity with legal preservation required.

---

## Example 7: KYC/AML Data Export (Banking)

**Severity: CRITICAL**

### Sender Context
- **Name:** Raj Patel
- **Role:** AML Compliance Analyst
- **Department:** Financial Crime & Compliance
- **Tenure:** 1.5 years (joined Aug 2024)
- **Risk Factors:** Access to SAR database. No prior bulk exports. Recently filed a workplace grievance against his manager. Browser history shows visits to WikiLeaks and financial whistleblower sites.

### Email

**From:** raj.patel@unionfinancial.com
**To:** raj.p.documents@outlook.com
**Date:** Thursday, Feb 13, 2026, 6:42 PM
**Subject:** Compliance research files

Sending these compliance research files so I can work on the regulatory reporting project from home this weekend.

Included:
- 147 Suspicious Activity Report narratives (pending FinCEN filing)
- Customer due diligence files for 89 high-risk accounts
- 12 active investigation summaries (including 3 under law enforcement referral)
- Correspondent banking risk assessments for MENA region relationships

I need to cross-reference these against the new FinCEN guidance before Monday's filing deadline.


### Why This Severity

**WHO** — AML analyst with grievance against management, showing potential whistleblower intent (browsing history). First bulk export of SAR data. **WHAT** — Suspicious Activity Reports are federally protected documents. Unauthorized disclosure of SARs is a federal crime under the Bank Secrecy Act (31 USC 5318). This also includes active investigation files and customer due diligence data. **WHO received** — Personal Outlook account. Whether the intent is whistleblowing, sale of information, or personal backup, the unauthorized removal of SARs from a bank's systems requires immediate legal and compliance intervention. SAR confidentiality violations carry criminal penalties. This is simultaneously a data breach, potential federal crime, and regulatory event.

---

## Example 8: Customer Credit Card Data (Fintech)

**Severity: CRITICAL**

### Sender Context
- **Name:** Viktor Sokolov
- **Role:** Database Administrator
- **Department:** Infrastructure
- **Tenure:** 8 months (joined Jun 2025)
- **Risk Factors:** Hired through a staffing agency (contract employee). Background check flagged a previous dismissal from a fintech company (reason: "policy violation" — details sealed). Has production database access. After-hours activity detected: ran queries against cardholder data environment at 11:47 PM.

### Email

**From:** viktor.sokolov@paynext.io
**To:** v_sokolov_tech@yahoo.com
**Date:** Tuesday, Feb 18, 2026, 11:52 PM
**Subject:** DB performance logs

Here are the performance analysis logs from tonight's optimization run.

Output file: db_perf_analysis_feb2026.csv.gz
Records exported: 23,400
Fields: customer_id, full_name, email, last_four_cc, transaction_history (12mo), billing_address, account_balance
Source: Production cardholder data environment
Export time: 11:47 PM - 11:52 PM

Need to analyze query performance patterns across these customer segments for the indexing optimization.


### Why This Severity

**WHO** — Contract DBA with sealed prior dismissal, short tenure, after-hours database queries. **WHAT** — Customer payment card data (PCI DSS scope), disguised as performance logs. 23,400 records with PII and partial card data. Misrepresentation of file contents suggests deliberate concealment. **WHO received** — Personal Yahoo email. This scenario combines PCI DSS data breach (mandatory notification to card brands within 72 hours), potential fraud (disguised filenames), and multiple risk signals on the sender (contractor, prior dismissal, late-night activity). Requires immediate evidence preservation, legal notification, and forensic investigation. PCI DSS breach alone warrants Critical; the behavioral context confirms it.

---

## Example 9: Payment Processing API Keys (Fintech)

**Severity: CRITICAL**

### Sender Context
- **Name:** Nina Chakraborty
- **Role:** Senior DevOps Engineer
- **Department:** Platform Engineering
- **Tenure:** 2.5 years (joined Aug 2023)
- **Risk Factors:** Submitted resignation yesterday. Moving to a competing payments platform. Has admin access to production infrastructure including secret vaults.

### Email

**From:** nina.chakraborty@rapidpay.com
**To:** nina.c.work@gmail.com
**Date:** Wednesday, Feb 19, 2026, 8:15 AM
**Subject:** Infrastructure docs for handover

Putting together handover documentation. Here are the infrastructure configs I have been maintaining:

Production Stripe Keys:
  sk_live_51Hx...dKjP (payment processing)
  rk_live_51Hx...mN7q (restricted, refunds only)

AWS IAM:
  Access Key: AKIA4MTWSI...
  Secret: wJalrXUtnFE...
  Region: us-east-1, eu-west-1

Database:
  Host: prod-db-cluster.us-east-1.rds.amazonaws.com
  User: app_service / Pass: Kj$8mP2nQ

Vault Root Token: hvs.CAESIJx7ZB...
SSL Certs: Located in /etc/ssl/private/ (including .key files)

All production systems I manage. Make sure the next person has these before my access is revoked.


### Why This Severity

**WHO** — Departing DevOps engineer with admin-level production access, moving to a direct competitor. Resignation submitted yesterday — this is the first day of the highest-risk departure window. **WHAT** — Production credentials and API keys that control payment processing, cloud infrastructure, and secret management. These are literally the keys to the kingdom. Compromised credentials could enable unauthorized financial transactions, data breaches, or infrastructure sabotage. **WHO received** — Personal Gmail. Even if intent is genuinely "handover documentation," sending production secrets to personal email is a Critical security event requiring immediate credential rotation, access revocation, and forensic audit. The departure-to-competitor context elevates urgency.

---

## Example 10: Regulatory Examination Response (Banking)

**Severity: CRITICAL**

### Sender Context
- **Name:** Catherine Holt
- **Role:** Chief Compliance Officer
- **Department:** Legal & Compliance
- **Tenure:** 7 years (joined Apr 2019)
- **Risk Factors:** No departure signals. However, recently in conflict with CEO over compliance findings. Board member privately encouraged her to "be more flexible" on examination responses.

### Recipient Context
- **Name:** Martin Kressel
- **Organization:** Financial Times (journalist covering banking regulation)
- **Relationship:** No prior contact. Domain is ft.com — verified media outlet.

### Email

**From:** catherine.holt@atlasbank.com
**To:** martin.kressel@ft.com
**Date:** Friday, Feb 14, 2026, 7:08 PM
**Subject:** Information you should see

Mr. Kressel,

I am writing because I believe the public has a right to know about significant compliance deficiencies at Atlas Bank that senior leadership is attempting to conceal from regulators.

Below is a comparison of what our internal compliance review actually found versus what the CEO instructed me to submit to the OCC.

SUBMITTED VERSION (redacted):
"The Bank has implemented satisfactory controls for BSA/AML compliance and is addressing minor procedural gaps identified during the examination."

ACTUAL FINDINGS (suppressed):
- Transaction monitoring system has been non-functional for 6 months (14,000 accounts unmonitored)
- 847 suspicious transactions were never filed as SARs
- KYC refresh backlog exceeds 2,400 high-risk accounts
- Three correspondent banking relationships flagged by FinCEN remain active

The CEO instructed me to remove these findings before submission. I have the full side-by-side document with tracked changes showing exactly what was deleted.

I am prepared to provide additional documentation if needed.

Regards,
A concerned employee


### Why This Severity

**WHO** — CCO with legitimate grievance about regulatory concealment, but bypassing all internal escalation channels (board audit committee, OCC whistleblower program, legal counsel) to go directly to media. **WHAT** — Active regulatory examination documents, including evidence of potential regulatory fraud (submitting redacted compliance findings to the OCC). This is simultaneously privileged attorney-client material, regulatory confidential information, and evidence of potential federal banking law violations. **WHO received** — Financial Times journalist. Media disclosure of regulatory examination documents could trigger immediate regulatory action, stock price impact, and bank run risk. While the underlying compliance issue may be legitimate, the CCO has statutory whistleblower channels (OCC, CFPB, SEC) that provide legal protection. Going to media first creates maximum institutional risk. Legal must be notified immediately — both for the leak and for the underlying compliance concealment.

---

## Example 11: Customer Portfolio Data to Personal Device (Banking)

**Severity: CRITICAL**

### Sender Context
- **Name:** Amanda Torres
- **Role:** Private Banking Relationship Manager
- **Department:** Wealth Management
- **Tenure:** 6 years (joined Mar 2020)
- **Risk Factors:** Resignation effective in 10 days. Rumored to be joining a rival private bank. Manages 67 UHNW client relationships totaling $4.2B AUM.

### Email

**From:** amanda.torres@premierwealth.com
**To:** amanda.torres.private@icloud.com
**Date:** Monday, Feb 17, 2026, 9:12 PM
**Subject:** Client notes

Quick reference notes on my client book:

Harrison Family Office - $340M AUM, reviewing alternatives after our fee increase. Anniversary dinner April 12.
Osei Trust - $275M, 3rd gen wealth transfer in progress. Patriarch (82) prefers bonds, son wants crypto allocation.
Chen Holdings - $410M, IPO of subsidiary planned Q3. Tax-loss harvesting opportunity in the PE portfolio.
Blackwell Group - $180M, NDA with competitor bank (I saw the pitch deck). Retention risk HIGH.
Torres Family - $295M, relocating to Florida, needs trust restructuring.
Kim Ventures - $198M, recently divorced, assets being re-titled.
Patel Industries - $520M, patriarch in declining health, succession planning urgent.

67 UHNW clients total, $4.2B AUM. Full details for each: net worth, investment allocations, risk profiles, liquidity events, estate plans, and personal relationship notes.


### Why This Severity

**WHO** — Departing relationship manager with $4.2B AUM, likely joining competitor. In wealth management, the relationship IS the asset — client books regularly follow departing RMs. **WHAT** — Complete UHNW client profiles including net worth, investment allocations, and personal relationship notes. This data would enable a competitor to immediately target these clients with personalized offers. Also contains sensitive personal financial information protected under Regulation S-P (financial privacy). **WHO received** — Personal iCloud email. This is the classic wealth management departure play: take the client book, leave the bank. Requires immediate legal hold, manager/legal notification, and potentially client notification under privacy regulations. The $4.2B AUM at risk makes this a board-level event.

---

## Example 12: Credit Risk Model with Customer SSNs (Banking)

**Severity: CRITICAL**

### Sender Context
- **Name:** Derek Okafor
- **Role:** Credit Risk Analyst
- **Department:** Risk Management
- **Tenure:** 3 years (joined Feb 2023)
- **Risk Factors:** No departure signals. However, recently published a paper on credit scoring methodology at an academic conference. Has been in discussions with a fintech startup about a consulting arrangement (detected via personal calendar sync).

### Email

**From:** derek.okafor@firstnationalbank.com
**To:** derek.okafor@university-research.edu
**Date:** Thursday, Feb 13, 2026, 3:45 PM
**Subject:** Dataset for research collaboration

Dr. Martinez,

As discussed, here is the dataset for our joint research paper on credit scoring optimization. I've included the model parameters and a sample dataset for validation.

Looking forward to our collaboration.

Best,
Derek


### Why This Severity

**WHO** — Credit risk analyst with academic publishing ambitions and potential consulting conflicts of interest. **WHAT** — Proprietary credit risk model (core banking IP) AND 45,000 customer records with Social Security Numbers and complete financial profiles. The SSNs alone make this a reportable data breach. The credit model parameters represent millions in R&D investment. **WHO received** — University email (academic collaboration). While the research intent may be genuine, sending un-anonymized customer SSNs to an external institution is a data breach under multiple regulations (GLBA, state breach notification laws, CCPA). The failure to anonymize suggests either negligence or disregard for data protection. Immediate legal notification, breach assessment, and potential regulatory reporting required.

---

## Example 13: Client Loan Portfolio Forwarded to Competitor (Banking)

**Severity: HIGH**

### Sender Context
- **Name:** Steven Blackwell
- **Role:** Commercial Lending Officer
- **Department:** Commercial Banking
- **Tenure:** 8 years (joined May 2018)
- **Risk Factors:** No resignation filed, but spouse recently posted on LinkedIn about relocating to another city where a competitor bank is headquartered. Performance review last quarter noted "exploring external opportunities."

### Recipient Context
- **Name:** Patricia Nowak
- **Organization:** Pacific Commerce Bank (competing commercial bank)
- **Relationship:** Former colleague of Steven's. Left Meridian Bank 2 years ago.

### Email

**From:** steven.blackwell@meridianbank.com
**To:** patricia.nowak@pacificcommerce.com
**Date:** Wednesday, Feb 19, 2026, 12:34 PM
**Subject:** Lunch next week?

Hi Pat,

Great to hear about the new role. Would love to catch up over lunch next week — been too long!

By the way, I pulled together that market overview you asked about. Some interesting trends in the mid-market lending space around here:

Top accounts by exposure:
- Henderson Industries: $12.4M term loan, 4.2% fixed, matures Dec 2027, 1.35x DSCR
- TechNova Corp: $8.7M revolver, SOFR+225bps, covenant-lite, renewal Feb 2027
- Pacific Timber: $6.1M equipment finance, cross-collateralized with RE
- Greenfield Medical: $15.2M construction loan, 60% drawn, completion Q3

84 commercial clients total with loan sizes, interest rates, maturity dates, and covenant structures. Let me know if you want the full spreadsheet.

Best,
Steve


### Why This Severity

**WHO** — Senior lending officer with indirect departure signals (spouse relocation, performance review note), sending data to a former colleague now at a competitor. **WHAT** — Commercial loan portfolio details disguised as a "market overview." The data includes client names, loan structures, and pricing — enough for a competitor to systematically approach these clients with better terms. **WHO received** — Former colleague at competing bank who specifically requested this information. The casual framing ("lunch next week") attempts to normalize the data sharing. This is High rather than Critical because: no immediate regulatory violation (commercial loan data is less regulated than consumer data), no evidence of imminent departure, and the sender's intent may be networking rather than deliberate IP theft. However, the competitive intelligence value and the specific request from a competitor employee warrants manager notification and investigation.

---

## Example 14: CRM Bulk Export by Departing Sales Rep

**Severity: HIGH**

### Sender Context
- **Name:** Ryan Torres
- **Role:** Senior Sales Representative
- **Department:** Sales
- **Tenure:** 4 years (joined Feb 2021)
- **Risk Factors:** Resignation effective next Friday. Moving to CompetitorCorp (confirmed by HR). Full account list export — 140x normal daily export volume. Territory covers only 200 accounts; exported all 4,200.

### Email

**From:** ryan.torres@neofinance.io
**To:** ryan.torres.work@gmail.com
**Date:** Wednesday, Feb 12, 2026, 6:30 AM
**Subject:** Contact backup

Backing up my contacts before my last day. Full export from the CRM:

Records: 4,200 (my territory is only 200, but grabbed everything for reference)
Fields: company_name, primary_contact, email, phone, contract_value, renewal_date, deal_stage, pricing_tier, account_notes

Some key accounts:
- Acme Corp: $340K/yr, renews March, considering CompetitorCorp
- TechVault: $180K/yr, expansion opportunity, CTO is the decision maker
- DataFlow Inc: $520K/yr, at-risk, pricing complaint logged last week
- NovaStar: $410K/yr, just signed 2-year extension at 15% discount


### Why This Severity

**WHO** — Confirmed departing sales rep, moving to a named competitor, one week before last day. **WHAT** — Complete CRM export far exceeding his territory (4,200 vs 200 assigned accounts), including competitive intelligence like pricing tiers and renewal dates. Customer lists with contract details are trade secrets. **WHO received** — Personal Gmail. This is High rather than Critical because: the data is commercial (not regulated PII/financial data), the export was through standard CRM tools (not a covert extraction), and the employee's intent (competitive poaching) is harmful but not criminal. Manager and HR notification required. Legal should assess trade secret protection options (cease-and-desist, non-compete enforcement).

---

## Example 15: Customer PII Exported via API

**Severity: HIGH**

### Sender Context
- **Name:** Dana Anderson
- **Role:** Data Engineer
- **Department:** Analytics
- **Tenure:** 3 years (joined Feb 2023)
- **Risk Factors:** Used service account credentials (not personal account). 420% above normal daily API volume. Ran extraction during off-peak hours. No open project requiring this data volume.

### Email

**From:** dana.anderson@rapidpay.com
**To:** dana.anderson@rapidpay.com (self-email)
**Date:** Wednesday, Feb 19, 2026, 4:35 AM
**Subject:** Analytics pipeline output - Feb batch

Saving the February batch processing output for the cross-reference project.

Batch summary:
- 8,400 customer records extracted
- Fields: full_name, email, phone, purchase_history_12mo, payment_method_type, last_four_digits, account_balance
- Source: Production customer API (used svc_analytics service account)
- Extraction window: 3:15 AM - 4:35 AM
- Format: JSON compressed

Sample record:
{"name": "Sarah Mitchell", "email": "s.mitchell@email.com", "phone": "+1-555-0147", "balance": 12847.50, "payment": "visa_4242", "purchases": 47}

Will cross-reference with the segmentation model tomorrow.


### Why This Severity

**WHO** — Data engineer using service account credentials rather than personal credentials (potential audit trail evasion), during off-hours, with massive volume anomaly. **WHAT** — 8,400 PII records including payment data. API-level extraction bypasses file-based monitoring. **WHO received** — Self-email (staging for later exfiltration or legitimate archiving). This is High rather than Critical because: the data went to a corporate email address (still within company systems), there's a plausible business explanation ("batch processing"), and the PII is commercial rather than financial account data. However, the service account usage, off-hours timing, and volume anomaly require immediate manager notification and investigation. If evidence of external transfer is found, escalate to Critical.

---

## Example 16: CRM Data Synced to Personal Cloud Storage

**Severity: HIGH**

### Sender Context
- **Name:** Kevin Martinez
- **Role:** Account Manager
- **Department:** Sales
- **Tenure:** 3.5 years (joined May 2022)
- **Risk Factors:** Configured unauthorized third-party integration. Personal Dropbox account as destination. Continuous sync (not one-time export).

### Email (Notification from Zapier integration, forwarded by Kevin to his manager as "evidence" of his workflow)

**From:** kevin.martinez@swiftpay.com
**To:** jennifer.walsh@swiftpay.com
**Date:** Wednesday, Feb 19, 2026, 2:00 AM
**Subject:** FW: My CRM workflow setup

Hey Jen,

Quick FYI — I set up a Zapier automation to keep my deal pipeline synced to Dropbox so I can review opportunities on my iPad during client meetings. Works great for prep. Let me know if you want me to set one up for the team.

---------- Forwarded message ----------
From: notifications@zapier.com
Subject: Your Zap is running: Salesforce → Dropbox
"New/Updated Opportunity in Salesforce → Create File in Dropbox" has been running successfully. 847 files created in the last 7 days.


### Why This Severity

**WHO** — Account manager with no malicious intent (actively sharing the setup with his manager), but creating an unauthorized data flow. **WHAT** — CRM opportunity data including deal sizes, customer contacts, pipeline information continuously synced to unmanaged personal storage. 847 files in 7 days. **WHO received** — Personal Dropbox (unmanaged, no enterprise security controls, no audit trail, no DLP coverage). This is High because: it creates a persistent, unmonitored data channel outside corporate security perimeter; it violates data handling policies even though the intent is productivity; and 847 files represent significant data exposure. The lack of malicious intent (he's telling his manager!) means coaching should accompany enforcement. Disable the sync, notify manager, coach on approved mobile access methods.

---

## Example 17: Suspicious Account Activity Report Shared Externally (Banking)

**Severity: HIGH**

### Sender Context
- **Name:** Michelle DeSilva
- **Role:** BSA Officer
- **Department:** Compliance
- **Tenure:** 5 years (joined Mar 2021)
- **Risk Factors:** No departure signals. Part of a team under pressure to clear a regulatory backlog. Has been working 60+ hour weeks.

### Recipient Context
- **Name:** External AML consulting firm (RegTech Solutions)
- **Relationship:** Firm has an active contract with the bank for AML advisory services, but the contract scope does not include access to raw SAR data.

### Email

**From:** michelle.desilva@unionfinancial.com
**To:** sarah.wright@regtechsolutions.com
**Date:** Monday, Feb 17, 2026, 8:15 PM
**Subject:** Cases for review - priority batch

Sarah,

We're drowning in the backlog and need your team's help prioritizing. Here is the current queue — can your analysts do a first-pass triage so we can focus on the most urgent filings?

Priority cases include:
- SAR-2026-1847: Wire structuring pattern, $2.3M across 14 accounts, suspected layering
- SAR-2026-1852: Cash deposits below CTR threshold, same branch, 3 customers linked to shell company
- SAR-2026-1861: Correspondent bank flagged, unusual USD/RUB conversion volume
- Plus 31 more pending SAR narratives with customer names, account numbers, and transaction details

I know this isn't in the standard SOW but we'll sort out the paperwork with procurement next week. Need to get these moving.

Thanks,
Michelle


### Why This Severity

**WHO** — BSA Officer under operational pressure, well-intentioned but bypassing proper contract scope and data sharing protocols. **WHAT** — Pending SAR narratives (not yet filed with FinCEN). While sharing with a contracted consulting firm is less risky than random external sharing, SAR data has federal confidentiality protections under the Bank Secrecy Act. The consulting contract doesn't cover raw SAR access. **WHO received** — Contracted AML advisory firm (some trust), but outside contract scope (unauthorized). This is High rather than Critical because: the recipient has an existing trusted relationship with the bank, the intent is clearly operational (clearing backlog, not theft), and the data hasn't left the regulated financial services ecosystem. However, SAR confidentiality violations are still serious, and the "sort out paperwork later" approach to data governance requires immediate manager notification and legal review of the contract scope.

---

## Example 18: Internal Audit Findings Shared with Board Member's Personal Email (Banking)

**Severity: HIGH**

### Sender Context
- **Name:** Gregory Tran
- **Role:** Internal Audit Director
- **Department:** Internal Audit
- **Tenure:** 4 years (joined Jan 2022)
- **Risk Factors:** None identified. Sending to a known board member, but using their personal email.

### Recipient Context
- **Name:** Margaret Chen
- **Organization:** Board of Directors (Audit Committee Chair)
- **Relationship:** Legitimate recipient, but using personal email (m.chen.personal@gmail.com) instead of board portal.

### Email

**From:** gregory.tran@atlasbank.com
**To:** m.chen.personal@gmail.com
**Date:** Tuesday, Feb 18, 2026, 5:47 PM
**Subject:** Audit findings - for your eyes only

Margaret,

I wanted you to see these findings before the formal committee presentation next week. I'm concerned the executive team may try to downplay the severity. The technology infrastructure audit found 14 critical control deficiencies.

I'm sending this to your personal email because I want to ensure it reaches you without going through executive assistants.

Please treat as strictly confidential.

Greg


### Why This Severity

**WHO** — Internal Audit Director, legitimate sender for this content, but bypassing normal board communication channels. **WHAT** — Draft audit findings including critical control deficiencies and an unresolved data breach. This is sensitive regulatory and governance information. **WHO received** — Audit Committee Chair (legitimate recipient), but via personal Gmail (unmanaged, no encryption, no audit trail). The sender's concern about executive interference suggests a governance breakdown. This is High because: the relationship is legitimate (audit → audit committee), the concern about executive interference may be valid, but sending to personal email creates a security gap. The audit findings about an unresolved data breach may themselves require regulatory reporting. Manager notification should go to the General Counsel (not the executive team the sender is concerned about).

---

## Example 19: Source Code Sent to Personal Email by Non-Engineer

**Severity: HIGH** (bordering Critical)

### Sender Context
- **Name:** Alex Chen
- **Role:** Marketing Director
- **Department:** Marketing
- **Tenure:** 5 years (joined Feb 2021)
- **Risk Factors:** No engineering access in role. LinkedIn updated 3 days ago. Personal email matches employee name pattern.

### Email

**From:** alex.chen@quantumtrade.io
**To:** alexchen.personal@gmail.com
**Date:** Wednesday, Feb 19, 2026, 9:45 AM
**Subject:** Files for backup

Backing up some files from my work machine. Found these in a shared drive I had access to:

auth_modules_backup/
  oauth2-handler.ts - 2,400 lines, token management
  session-manager.ts - 1,800 lines, session lifecycle
  credential-vault.ts - 3,200 lines, AES-256 key rotation
  api-key-generator.ts - 890 lines, key provisioning
  rbac-engine.ts - 3,100 lines, role-based access control

47 source files, 12,000+ lines total. These are the core authentication and credential management modules.


### Why This Severity

**WHO** — Marketing Director with NO legitimate need for source code. Cross-department access to engineering repos is a red flag. LinkedIn updated recently (departure signal). **WHAT** — Authentication source code with embedded credentials. Security-critical code. **WHO received** — Personal Gmail. The key question AXIA raises: HOW did a Marketing Director obtain authentication source code? This suggests either unauthorized access escalation, a compromised account, or insider collusion. DLP would see "code sent externally." AXIA sees a non-technical role accessing and exfiltrating security-critical code during a potential pre-departure window. Elevated to High/Critical based on the role-content mismatch and departure signals.

---

## Example 20: Payment Fraud Investigation Files (Fintech)

**Severity: HIGH**

### Sender Context
- **Name:** Yuki Tanaka
- **Role:** Fraud Operations Lead
- **Department:** Trust & Safety
- **Tenure:** 4 years (joined Feb 2022)
- **Risk Factors:** No departure signals. Active fraud investigations. Recently presented at an industry conference on fraud patterns.

### Recipient Context
- **Name:** Daniel Ko
- **Organization:** FinGuard Analytics (fraud detection vendor)
- **Relationship:** Active vendor relationship. NDA in place. However, sharing active investigation data is NOT within the vendor agreement scope.

### Email

**From:** yuki.tanaka@paynext.io
**To:** daniel.ko@finguard-analytics.com
**Date:** Thursday, Feb 13, 2026, 2:30 PM
**Subject:** Fraud pattern samples for model improvement

Dan,

Here are some real-world examples from our recent investigations. These should help your team improve the detection models for our use case. I've included the transaction details and outcomes so your ML team can use them for training.

Thanks for the quick turnaround on the last model update.

Yuki


### Why This Severity

**WHO** — Fraud Ops Lead with legitimate vendor relationship, well-intentioned (improving fraud detection), but sharing active investigation data outside the vendor agreement scope. **WHAT** — Active fraud investigation data including cases under law enforcement referral. Sharing investigation details could compromise ongoing cases and violate information-sharing restrictions. **WHO received** — Active vendor with NDA (some trust), but outside contractual scope for raw investigation data. This is High because: the vendor relationship provides some legitimacy, the intent is clearly operational improvement (not malicious), but active investigation data (especially law enforcement referrals) has strict handling requirements. Notify manager and legal to review vendor agreement scope.

---

## Example 21: Product Roadmap in Public Teams Channel

**Severity: MEDIUM**

### Sender Context
- **Name:** Priya Desai
- **Role:** Product Manager
- **Department:** Product
- **Tenure:** 3 years (joined Nov 2022)
- **Risk Factors:** None. Clean record. Likely accidental — similar channel names caused confusion.

### Email (Teams message, rendered as email notification)

**From:** priya.desai@neofinance.io
**To:** Product-Updates channel (340 members, including 12 external guest accounts from partner organizations)
**Date:** Wednesday, Feb 19, 2026, 12:05 PM
**Subject:** [Teams] 2026 Product Roadmap - Q2 Planning

Hey team! Here's the finalized 2026 roadmap for Q2 planning discussions. Please review before Thursday's meeting.

Let me know if you have questions.


### Why This Severity

**WHO** — Product Manager, role-appropriate to share roadmaps internally, no risk factors. **WHAT** — Confidential product roadmap with strategic content shared to a channel with external guests. The document itself is sensitive but the sharing appears accidental (wrong channel selection). **WHO received** — 328 internal employees (appropriate) + 12 external partner guests (inappropriate). This is Medium because: the intent is clearly benign (accidental), the document was removed quickly, external exposure was limited to existing partners (not competitors), and the PM's clean record suggests a simple mistake. Coaching on channel selection is the appropriate response. If any of the 12 external guests were from competitor organizations, this would escalate to High.

---

## Example 22: Engineering Oversharing Pattern

**Severity: MEDIUM**

### Sender Context
- **Name:** Engineering Team (aggregate pattern — 6 individuals)
- **Roles:** Various — Software Engineers, DevOps, QA
- **Department:** Engineering (3 different teams)
- **Risk Factors:** Team-wide pattern suggests process gap, not individual malice. All shares were to the same 3 external domains. New contractor onboarding may have created confusion about approved sharing policies.

### Email (Representative example from the pattern)

**From:** james.liu@swiftpay.com
**To:** dev-team@cloudintegrations.io
**Date:** Tuesday, Feb 18, 2026, 3:22 PM
**Subject:** API specs for integration

Hi CloudIntegrations team,

Here are the API specifications and architecture diagrams you need for the payment gateway integration:

- REST API spec (OpenAPI 3.1): All endpoints, request/response schemas, error codes
- System architecture diagram: Microservice topology, message queues, database connections
- Data flow diagrams: Payment processing pipeline, PCI scope boundary
- Authentication flow: OAuth2 implementation details, token lifecycle

Let me know if you need the webhook integration docs too.

Best,
James


### Why This Severity

**WHO** — 6 engineers across 3 teams, all sharing with the same unapproved external domains. Pattern suggests a new project or vendor relationship that hasn't been properly onboarded in the approved vendor list. **WHAT** — Technical documentation (API specs, architecture diagrams). Reveals system design but not customer data or credentials. **WHO received** — Same 3 external domains across all 6 engineers — consistent with a legitimate new project partner that simply hasn't been added to the approved list. This is Medium because: individual shares were low risk, the pattern suggests a process gap (not malicious coordination), the content is technical but not highly sensitive, and the recipient pattern is consistent and explainable. Team lead notification and security awareness training are appropriate. Update the approved vendor list if the relationship is legitimate.

---

## Example 23: Compensation Data Export for Benchmarking

**Severity: MEDIUM**

### Sender Context
- **Name:** Rachel Green
- **Role:** HR Analyst
- **Department:** Human Resources
- **Tenure:** 4.5 years (joined Aug 2021)
- **Risk Factors:** None identified. Role-appropriate access to compensation data. Legitimate business purpose (market competitiveness analysis). However, skipped the required approval workflow.

### Recipient Context
- **Name:** CompBench Consulting (compensation benchmarking firm)
- **Relationship:** Active consulting engagement. NDA signed. VP HR approved the engagement but not the specific data export.

### Email

**From:** rachel.green@globalbank.com
**To:** analytics@compbench-consulting.com
**Date:** Thursday, Feb 13, 2026, 10:15 AM
**Subject:** Compensation data for market analysis

Hi CompBench team,

Here's the compensation dataset for our market competitiveness study. Please handle per our NDA terms. I need the benchmark report by end of month for our annual review cycle.

Thanks,
Rachel


### Why This Severity

**WHO** — HR Analyst, role-appropriate access, legitimate business purpose, trusted external relationship with NDA. **WHAT** — Sensitive employee compensation data with names (not anonymized). Bulk export of 842 records. **WHO received** — Contracted consulting firm with active engagement and NDA. This is Medium because: the purpose is legitimate (annual comp benchmarking is standard HR practice), the recipient is authorized at a business level, and the engagement exists. However, Rachel skipped the required VP HR approval for the specific data export, and the data wasn't anonymized. Coach on the approval workflow, route approval to VP HR, and remind about anonymization best practices.

---

## Example 24: Customer Account Statements Emailed to Wrong Client (Banking)

**Severity: MEDIUM**

### Sender Context
- **Name:** Laura Simmons
- **Role:** Client Services Associate
- **Department:** Retail Banking Operations
- **Tenure:** 2 years (joined Feb 2024)
- **Risk Factors:** None. Human error — email autocomplete selected wrong contact.

### Recipient Context
- **Name:** Michael Harrison (wrong recipient)
- **Organization:** Existing bank customer (different client)
- **Relationship:** Both are bank customers, but Michael received another customer's statements.

### Email

**From:** laura.simmons@centraltrustbank.com
**To:** m.harrison@email.com
**Date:** Monday, Feb 17, 2026, 2:45 PM
**Subject:** Your February account statements - Henderson Industries

Dear Mr. Henderson,

Here are your February account statements as requested.

Henderson Industries - Business Checking (#****4821)
  Opening Balance: $847,291.34
  Deposits: $1,247,500.00 (includes payroll funding $312,000)
  Withdrawals: $983,147.22
  Closing Balance: $1,111,644.12

Henderson Industries - Business Savings (#****7733)
  Balance: $2,340,000.00
  Interest Earned: $4,875.00

Key transactions this month:
  02/03 - Vendor payment, Acme Supply Co: -$127,400.00
  02/07 - Payroll disbursement (47 employees): -$312,000.00
  02/14 - Client payment, Pacific Retail: +$485,000.00

If you have any questions about the figures, please don't hesitate to reach out.

Best regards,
Laura Simmons
Client Services Associate
Central Trust Bank


### Why This Severity

**WHO** — Junior client services associate, no risk factors, clear human error (email says "Dear Mr. Henderson" but sent to different customer). **WHAT** — Business account statements with financial details. Privacy-sensitive (GLBA protected) but not systematically collected or maliciously shared. **WHO received** — Another bank customer (not a competitor, not public, but unauthorized recipient). This is Medium because: it's a misdirected email (human error), the data is financial but limited in scope (one client's statements), the recipient is a known bank customer (lower risk than unknown external), and the error is immediately apparent from the greeting. Coach the employee on email verification procedures, contact the wrong recipient for deletion confirmation, and potentially notify Henderson Industries per breach notification requirements (regulatory assessment needed).

---

## Example 25: Vendor Rate Sheets Shared With Competing Vendor (Fintech)

**Severity: MEDIUM**

### Sender Context
- **Name:** Alex Rivera
- **Role:** Procurement Manager
- **Department:** Operations
- **Tenure:** 3 years (joined Feb 2023)
- **Risk Factors:** No departure signals. Recently began vendor negotiation cycle for annual renewals.

### Recipient Context
- **Name:** Lisa Chang
- **Organization:** DataStream Technologies (competing vendor to the bank's current payment processing partner)
- **Relationship:** Active RFP participant — DataStream is bidding against the incumbent vendor.

### Email

**From:** alex.rivera@rapidpay.com
**To:** lisa.chang@datastream-tech.com
**Date:** Tuesday, Feb 18, 2026, 11:30 AM
**Subject:** RFP context - current pricing structure

Lisa,

To help you prepare a competitive proposal, I'm sharing our current vendor rate sheet so you can benchmark your pricing accordingly. This should help you understand what we're currently paying and where we'd like to see improvement.

Looking forward to your proposal.

Alex


### Why This Severity

**WHO** — Procurement manager, role involves vendor negotiation, no risk factors. **WHAT** — Incumbent vendor's confidential rate sheet shared with their competitor. This likely violates the NDA with the incumbent vendor. **WHO received** — Competing vendor in an active RFP process. While sharing pricing context to get competitive bids is understandable, sharing the exact rate sheet crosses a line from "context" to "confidential vendor data." This is Medium because: the intent is cost optimization (legitimate business goal), the data is vendor pricing (not customer data or bank IP), and procurement negotiations regularly involve some pricing transparency. However, the specific sharing of a vendor's confidential rate sheet likely violates NDA terms. Notify manager, review vendor NDA obligations, and coach on appropriate RFP information sharing practices.

---

## Example 26: Loan Underwriting Criteria Shared on Industry Forum (Banking)

**Severity: MEDIUM**

### Sender Context
- **Name:** Patricia Wong
- **Role:** Senior Underwriter
- **Department:** Credit Risk
- **Tenure:** 7 years (joined Apr 2019)
- **Risk Factors:** None. Active in industry associations. Previously presented at banking conferences with management approval.

### Email (Post to an industry mailing list, also sent via email)

**From:** patricia.wong@firstnationalbank.com
**To:** commercial-lending-forum@bankingprofessionals.org
**Date:** Wednesday, Feb 19, 2026, 9:15 AM
**Subject:** RE: [Forum] Best practices for CRE underwriting in 2026

Great discussion everyone. At First National, we've found success with these criteria for CRE loans:

- LTV caps at 75% for office, 80% for multifamily
- DSCR minimum 1.25x (we moved from 1.20x after the 2024 adjustments)
- Sponsor net worth requirement: 25% of loan amount minimum
- Interest rate stress test: +200bps from base rate
- Cap rate floor assumptions: 6.5% office, 5.0% multifamily

We also recently tightened our concentration limits — no more than 15% of total CRE exposure to any single submarket. Happy to discuss further offline.

Pat

### Why This Severity

**WHO** — Senior underwriter, respected in industry, no risk factors. **WHAT** — Specific underwriting criteria and internal policy thresholds posted to an industry forum. This reveals the bank's credit appetite, risk parameters, and recent policy changes. **WHO received** — Industry forum (semi-public, includes professionals from competing banks). This is Medium because: industry knowledge sharing is common and often encouraged by management, the criteria are generally in-line with industry standards, and the intent is professional reputation-building. However, specific thresholds (exact LTV caps, concentration limits, recent policy changes) could be used by competitors to identify where First National will and won't compete, and by borrowers to structure deals at the edges of approval criteria. Coach on what constitutes shareable "best practices" vs. proprietary risk parameters. Suggest management review before future posts.

---

## Example 27: Internal Rate Card Shared with Client (Fintech)

**Severity: MEDIUM**

### Sender Context
- **Name:** Aisha Patel
- **Role:** Business Development Manager
- **Department:** Partnerships
- **Tenure:** 2 years (joined Feb 2024)
- **Risk Factors:** None. Eager to close a deal. New to the role.

### Recipient Context
- **Name:** Carlos Mendez
- **Organization:** RetailPay (potential enterprise client)
- **Relationship:** In active sales cycle, proposal stage.

### Email

**From:** aisha.patel@rapidpay.com
**To:** carlos.mendez@retailpay.com
**Date:** Tuesday, Feb 18, 2026, 4:30 PM
**Subject:** Pricing details for your review

Hi Carlos,

As promised, here's our full pricing breakdown. I want to be fully transparent so we can find the right fit for RetailPay.

Let me know if you'd like to discuss the enterprise tier options.

Best,
Aisha


### Why This Severity

**WHO** — Junior BD manager, new to role, no malicious intent. **WHAT** — Internal rate card revealing margin structure, discount authority, and competitive pricing strategy. This is NOT the customer-facing price list — it's the internal document showing how much margin exists and how far the company can negotiate. **WHO received** — Prospective client in active negotiation. Sharing this gives the client complete visibility into the company's negotiation position. This is Medium because: the intent is transparency (not malicious), the data is commercial (not PII or regulated), and the damage is financial (margin erosion) rather than regulatory. Coach on the difference between customer-facing and internal pricing documents, notify sales management, and assess whether the negotiation position is compromised.

---

## Example 28: Mortgage Application Data for Marketing Analysis (Banking)

**Severity: MEDIUM**

### Sender Context
- **Name:** David Kim
- **Role:** Marketing Analyst
- **Department:** Marketing
- **Tenure:** 3 years (joined Feb 2023)
- **Risk Factors:** None. Working on a segmentation project that legitimately requires demographic data but not individual PII.

### Email

**From:** david.kim@premierwealth.com
**To:** insights@adtarget-analytics.com
**Date:** Monday, Feb 17, 2026, 10:00 AM
**Subject:** Customer segmentation data for targeting model

Hi AdTarget team,

Here's the dataset for building our mortgage prospect targeting model. We need the segments ready for the spring campaign launch in March.

Thanks,
David


### Why This Severity

**WHO** — Marketing analyst, legitimate project, no risk factors, but failed to properly anonymize data. **WHAT** — Mortgage application data with PII sent to external marketing vendor. GLBA and fair lending implications (demographic + income + credit data could enable discriminatory targeting). **WHO received** — Marketing analytics vendor (legitimate business relationship, likely has appropriate DPAs). This is Medium because: the project is legitimate, the vendor relationship exists, and the intent is business operations. However, the failure to anonymize creates privacy and fair lending risk. The fix is straightforward: retrieve the un-anonymized file, send properly anonymized version, confirm deletion of PII version, and coach on data anonymization procedures. Potential regulatory implications require compliance review.

---

## Example 29: Board Meeting Minutes Shared Prematurely (Banking)

**Severity: MEDIUM**

### Sender Context
- **Name:** Elena Vasquez
- **Role:** Corporate Secretary
- **Department:** Legal & Governance
- **Tenure:** 6 years (joined Mar 2020)
- **Risk Factors:** None identified. Acting with urgency to distribute minutes for review before filing deadline.

### Recipient Context
- **Name:** Board of Directors distribution list
- **Note:** Distribution list includes 3 board members who were not present at the executive session and should not receive certain sections.

### Email

**From:** elena.vasquez@atlasbank.com
**To:** board-distribution@atlasbank.com
**Date:** Friday, Feb 14, 2026, 4:55 PM
**Subject:** February Board Meeting Minutes - DRAFT for review

Dear Board Members,

Please find attached the draft minutes from last Thursday's board meeting, including the executive session. I need your review comments by Wednesday for filing.

Kind regards,
Elena


### Why This Severity

**WHO** — Corporate Secretary, role-appropriate sender, legitimate distribution purpose. **WHAT** — Board minutes including executive session content sent to conflicted board members. Governance breach rather than data exfiltration. **WHO received** — Board members (legitimate for most content) but includes 3 who were recused from executive session topics. This is Medium because: the distribution is mostly legitimate, the intent is administrative (meeting deadline), and the recipients are all board members (trusted insiders). However, sharing executive session content with conflicted board members is a corporate governance violation that could have legal implications. Recall the email, redistribute without executive session sections to conflicted members, and coach on recusal-aware distribution procedures.

---

## Example 30: Transaction Monitoring Rules Shared with Vendor (Banking)

**Severity: MEDIUM**

### Sender Context
- **Name:** Ahmed Hassan
- **Role:** Financial Crime Analyst
- **Department:** AML/CFT
- **Tenure:** 2 years (joined Feb 2024)
- **Risk Factors:** None. Working on vendor integration project for upgraded transaction monitoring system.

### Recipient Context
- **Name:** Technical team at TM Solutions (transaction monitoring vendor)
- **Relationship:** Selected vendor for new TM system. Contract signed. Implementation in progress.

### Email

**From:** ahmed.hassan@unionfinancial.com
**To:** implementation@tm-solutions.com
**Date:** Wednesday, Feb 19, 2026, 11:45 AM
**Subject:** Current rule set for migration

TM Solutions team,

Here's our complete current transaction monitoring rule set for migration to your platform. This includes all detection scenarios, thresholds, and tuning parameters from our existing system.

Let me know if you need the historical alert data too for model calibration.

Ahmed


### Why This Severity

**WHO** — Financial crime analyst, legitimate project context. **WHAT** — Complete AML transaction monitoring rules. While needed for vendor migration, these rules essentially constitute the bank's defensive playbook against money laundering. If leaked, bad actors could structure transactions to avoid detection. **WHO received** — Contracted vendor (legitimate, NDA in place), but through regular email rather than a secure transfer channel. This is Medium because: the vendor relationship is legitimate, the data transfer is needed for the project, and the intent is operational. However, TM rule sets should only be transferred via secure, encrypted channels (not email), and sharing the COMPLETE rule set may exceed what's needed for initial migration. Coach on secure data transfer methods and the principle of minimum necessary data sharing.

---

## Example 31: Customer Contact List for Event Planning

**Severity: LOW**

### Sender Context
- **Name:** Sarah Chen
- **Role:** Events Coordinator
- **Department:** Marketing
- **Tenure:** 2 years (joined Mar 2024)
- **Risk Factors:** None. Planning an annual client appreciation event.

### Recipient Context
- **Name:** Premier Events Group (contracted event planning firm)
- **Relationship:** Active vendor, NDA and DPA in place, contracted for this specific event.

### Email

**From:** sarah.chen@swiftpay.com
**To:** planning@premierevents.com
**Date:** Monday, Feb 17, 2026, 9:30 AM
**Subject:** Guest list for April client event

Hi Premier Events team,

Here's the guest list for our April client appreciation dinner. Please use this for name badges, seating arrangements, and catering dietary preferences.

Thanks,
Sarah


### Why This Severity

**WHO** — Events coordinator, role-appropriate task, no risk factors. **WHAT** — Client contact information (names, companies, titles, dietary preferences) for an event. Limited PII, no financial data, no sensitive business information. **WHO received** — Contracted event vendor with appropriate agreements in place. This is Low because: the purpose is entirely legitimate, the data is minimal (event logistics only), the vendor is authorized, and the risk of harm from exposure is very limited. Auto-resolve after verification that the vendor agreement is current.

---

## Example 32: Open Source Code Contribution

**Severity: LOW**

### Sender Context
- **Name:** Alex Thompson
- **Role:** Staff Engineer
- **Department:** Engineering
- **Tenure:** 6 years (joined Mar 2020)
- **Risk Factors:** None. Listed OSS maintainer. Legal cleared this project 3 months ago.

### Email (GitHub notification about the push, forwarded internally)

**From:** alex.thompson@rapidpay.com
**To:** opensource-review@rapidpay.com
**Date:** Wednesday, Feb 12, 2026, 3:40 PM
**Subject:** FW: [GitHub] Push to company-utils/logging-framework

Team,

FYI — pushed the latest logging framework updates to the public repo. Changes include the retry logic improvements we discussed in last week's architecture review.

All changes are within the pre-approved OSS scope (Apache 2.0, cleared by Legal in November).

Alex

---------- Forwarded ----------
From: noreply@github.com
Subject: [company-utils/logging-framework] Push: 14 commits to main

### Why This Severity

**WHO** — Staff engineer, designated OSS maintainer, clean record. **WHAT** — Logging utility code, pre-approved for open source release. Not proprietary business logic, no customer data, no credentials. **WHO received** — Public GitHub repository (pre-approved). This is Low because: the contribution is pre-approved by Legal, the code is a utility framework (not core IP), the engineer is a designated maintainer, and all review processes were followed. Auto-verify against OSS approval registry and close.

---

## Example 33: NDA Sent to Wrong Email Address

**Severity: LOW**

### Sender Context
- **Name:** Maria Santos
- **Role:** Legal Assistant
- **Department:** Legal
- **Tenure:** 4 years (joined Mar 2022)
- **Risk Factors:** None. Email autocomplete error.

### Email

**From:** maria.santos@neofinance.io
**To:** john.smith@acme-corp.net (WRONG — should be john.smith@acme-corp.com)
**Date:** Tuesday, Feb 11, 2026, 11:00 AM
**Subject:** NDA for review and signature - NeoFinance & Acme Corp

Dear Mr. Smith,

Please find attached the mutual NDA for the proposed partnership between NeoFinance and Acme Corp. We'd appreciate your review and signature by end of week.

Kind regards,
Maria Santos
Legal Assistant
NeoFinance


### Why This Severity

**WHO** — Legal assistant, no risk factors, clear typo (.net vs .com). **WHAT** — Standard mutual NDA. The document itself is a confidentiality agreement, not confidential data. **WHO received** — Wrong person at a similar domain. The document reveals only that NeoFinance and Acme Corp are considering a partnership. This is Low because: the error is immediately apparent, the document content is low-sensitivity (it's a standard NDA template), the exposure is limited to one wrong recipient, and the fix is straightforward (contact wrong recipient, confirm deletion). Auto-resolve after recipient deletion confirmation.

---

## Example 34: Meeting Recording Shared with Approved Consultant

**Severity: LOW**

### Sender Context
- **Name:** James Wilson
- **Role:** Project Manager
- **Department:** Operations
- **Tenure:** 5.5 years (joined Jul 2020)
- **Risk Factors:** None. Sharing with authorized project consultant.

### Recipient Context
- **Name:** Sarah Martinez
- **Organization:** Apex Consulting (contracted consulting firm)
- **Relationship:** Active engagement, NDA signed, consultant assigned to the digital transformation project.

### Email

**From:** james.wilson@globalbank.com
**To:** sarah.martinez@apexconsulting.com
**Date:** Wednesday, Feb 12, 2026, 2:50 PM
**Subject:** Last week's project standup recording

Hi Sarah,

Here's the recording from last Thursday's standup since you couldn't attend. Main discussion was the API integration timeline — starts around minute 15.

See you at next week's review.

James


### Why This Severity

**WHO** — Project manager, standard role behavior, no risk factors. **WHAT** — Internal meeting recording. Content is operational project discussion, no strategic or sensitive business data. **WHO received** — Consultant actively assigned to the project, NDA signed, approved vendor. This is Low because: the recipient is authorized and assigned to the project, the content is operational (not strategic), the sharing is role-appropriate, and there's no policy violation. Auto-verify vendor authorization and close.

---

## Example 35: Personal Financial Planning Spreadsheet (Banking Employee)

**Severity: LOW**

### Sender Context
- **Name:** Rebecca Liu
- **Role:** Wealth Advisor
- **Department:** Wealth Management
- **Tenure:** 5 years (joined Mar 2021)
- **Risk Factors:** None. Personal finance activity during lunch break.

### Email

**From:** rebecca.liu@premierwealth.com
**To:** rebecca.liu.personal@gmail.com
**Date:** Tuesday, Feb 18, 2026, 12:15 PM
**Subject:** Budget spreadsheet

Here is my updated personal budget for 2026:

Monthly Income: $8,200 (after tax)
Rent: $2,400
Car Payment: $385
Student Loans: $620
Groceries: $500
Utilities: $180
Retirement (401k match): $650
Emergency Fund: $400
Discretionary: $1,065

Savings goal: $45,000 by December for house down payment.
Current savings: $28,400.

No client data here, just my personal finances using the bank's Excel template.


### Why This Severity

**WHO** — Wealth advisor, no risk factors. **WHAT** — Personal financial planning document with no client data, no bank IP, no sensitive information. Uses bank's template formatting but content is entirely personal. **WHO received** — Personal Gmail. This is Low because: the content is exclusively personal, there's no client data exposure, no bank IP involved, and personal finance management during lunch is reasonable. DLP might flag this because it uses a bank template and contains financial figures, but AXIA's content analysis recognizes it as personal data. Auto-resolve.

---

## Example 36: Industry Report Shared with Client

**Severity: LOW**

### Sender Context
- **Name:** Mark Johnson
- **Role:** Relationship Manager
- **Department:** Commercial Banking
- **Tenure:** 8 years (joined May 2018)
- **Risk Factors:** None. Client relationship management activity.

### Recipient Context
- **Name:** David Chen
- **Organization:** TechCorp Inc. (existing commercial banking client)
- **Relationship:** Active lending relationship, 4-year client.

### Email

**From:** mark.johnson@centraltrustbank.com
**To:** david.chen@techcorp.com
**Date:** Wednesday, Feb 19, 2026, 10:30 AM
**Subject:** Industry report you might find useful

David,

Saw this report from our research team and thought of your expansion plans. Some interesting data on the Southeast market that might help your site selection process.

Let's touch base next week about the credit facility renewal.

Mark


### Why This Severity

**WHO** — Senior relationship manager, standard client relationship activity. **WHAT** — Published industry research report explicitly marked "For Client Distribution." No proprietary data. **WHO received** — Active, long-standing commercial banking client. This is Low because: the document is intended for client distribution, the sharing is role-appropriate, the client relationship is established, and there's no sensitive data exposure. DLP might flag this because it's a "bank document sent externally," but AXIA recognizes the distribution-approved classification. Auto-resolve.

---

## Example 37: Regulatory Filing Draft Shared with External Counsel (Banking)

**Severity: LOW**

### Sender Context
- **Name:** Christine Palmer
- **Role:** Senior Compliance Officer
- **Department:** Regulatory Compliance
- **Tenure:** 6 years (joined Apr 2020)
- **Risk Factors:** None. Working within normal compliance workflow.

### Recipient Context
- **Name:** Robert Kim
- **Organization:** Baker & McKenzie (external legal counsel)
- **Relationship:** Engaged law firm for regulatory matters. Long-standing relationship, current engagement letter.

### Email

**From:** christine.palmer@atlasbank.com
**To:** robert.kim@bakermckenzie.com
**Date:** Monday, Feb 17, 2026, 3:30 PM
**Subject:** Draft Call Report - Q4 2025 review

Robert,

Please review the attached draft Call Report before we file with the FDIC next week. Specifically, I'd like your input on the loan loss reserve methodology section — we made some changes this quarter.

Thanks,
Christine


### Why This Severity

**WHO** — Senior Compliance Officer, role-appropriate task. **WHAT** — Draft Call Report that will become public upon filing. Shared for legal review before submission. **WHO received** — Engaged external law firm (attorney-client privilege). This is Low because: the data will soon be public (filing is routine), the recipient is engaged counsel (privileged communication), the workflow is standard compliance procedure, and there's no unauthorized disclosure. Auto-resolve after verifying current engagement letter.

---

## Example 38: Customer Data for Approved Research Project (Fintech)

**Severity: LOW**

### Sender Context
- **Name:** Dr. Amara Osei
- **Role:** Data Scientist
- **Department:** Analytics
- **Tenure:** 3 years (joined Feb 2023)
- **Risk Factors:** None. Working on approved research collaboration with proper IRB review.

### Recipient Context
- **Name:** Research team at Stanford University
- **Relationship:** Active research collaboration. University DPA signed. Data anonymization protocol approved by Privacy team.

### Email

**From:** amara.osei@paynext.io
**To:** fintech-research@stanford.edu
**Date:** Thursday, Feb 13, 2026, 2:00 PM
**Subject:** Anonymized transaction dataset - Q3/Q4

Hi Stanford team,

Here's the anonymized transaction dataset for the financial inclusion research. All data has been through our standard anonymization pipeline (k-anonymity with k=10, as specified in our DPA).

Let me know if the sample size is sufficient for your analysis.

Best,
Amara


### Why This Severity

**WHO** — Data scientist, approved research project, no risk factors. **WHAT** — Properly anonymized transaction data (k-anonymity, bucketed, hashed). No PII recoverable. **WHO received** — University research team under DPA. This is Low because: data is properly anonymized per approved protocol, the research collaboration is authorized, the DPA is in place, and the anonymization technique was reviewed by the Privacy team. Auto-verify anonymization standard and close. This is exactly the kind of data sharing that supports innovation while protecting privacy.

---

## Example 39: Customer Complaint Forwarded to Product Team

**Severity: LOW**

### Sender Context
- **Name:** Jason Park
- **Role:** Customer Support Manager
- **Department:** Customer Experience
- **Tenure:** 3 years (joined Feb 2023)
- **Risk Factors:** None. Normal support workflow.

### Email

**From:** jason.park@swiftpay.com
**To:** product-feedback@swiftpay.com
**Date:** Wednesday, Feb 19, 2026, 11:00 AM
**Subject:** FW: Customer feedback - recurring payment issues

Product team,

Forwarding a customer complaint about our recurring payment feature. This is the 4th similar complaint this week — might indicate a systematic issue.

Key issue: customers report payments failing silently without notification.

---------- Forwarded ----------
From: michael.ross@techstartup.io
Subject: Recurring payment failures

Hi SwiftPay Support,

Our recurring payments have failed 3 times this month with no error notification. We only noticed when our vendor called about unpaid invoices. This is causing serious operational issues.

Can you look into this urgently?

Michael Ross
COO, TechStartup.io

### Why This Severity

**WHO** — Support manager, appropriate escalation path. **WHAT** — Customer complaint about product functionality. Contains customer name and company but in a business context (they wrote to support). **WHO received** — Internal product team (appropriate escalation). This is Low because: the communication is entirely internal, the customer provided this information voluntarily to support, the escalation path is standard, and the purpose (product improvement) is appropriate. The customer's name and company in the forwarded email is normal support workflow. Auto-resolve.

---

## Example 40: Departing Employee Downloads Personal Files

**Severity: LOW**

### Sender Context
- **Name:** Tom Bradley
- **Role:** Marketing Specialist
- **Department:** Marketing
- **Tenure:** 3 years (joined Feb 2023)
- **Risk Factors:** Submitted resignation (departing in 2 weeks). However, downloads are limited to personal files.

### Email

**From:** tom.bradley@neofinance.io
**To:** tom.bradley.personal@gmail.com
**Date:** Tuesday, Feb 18, 2026, 5:30 PM
**Subject:** Personal files from work machine

Backing up my personal stuff before my last day. Just the files I need from my work laptop:

- My resume (updated last month)
- Photos from the team offsite in September
- Tax documents I had saved on the desktop
- My performance reviews from the past 3 years (my own reviews as employee)
- Award certificate from the Q3 innovation challenge

Nothing work-related. Just personal files that accumulated over 3 years.


### Why This Severity

**WHO** — Departing employee (normally elevates concern), but content analysis shows only personal files. **WHAT** — Personal documents: resume, personal photos, tax documents, own performance reviews. No company IP or client data. **WHO received** — Personal Gmail. This is Low because: despite the departure flag (which normally elevates severity), AXIA's content analysis confirms these are genuinely personal files. An employee has a reasonable expectation to retrieve their personal documents. A DLP system would flag "departing employee sending files to personal email" as High, but AXIA's judgment layer correctly identifies the content as harmless. Auto-verify content classification and close. This is a prime example of judgment over enforcement — blocking this would damage trust without reducing risk.

---

## Example 41: Accidental Reply-All with Salary Discussion (Banking)

**Severity: MEDIUM**

### Sender Context
- **Name:** Karen Phillips
- **Role:** VP, Human Resources
- **Department:** HR
- **Tenure:** 8 years (joined Jun 2018)
- **Risk Factors:** None. Accidental reply-all.

### Email

**From:** karen.phillips@meridianbank.com
**To:** All-Directors@meridianbank.com (32 recipients — all department directors)
**Date:** Monday, Feb 17, 2026, 4:15 PM
**Subject:** RE: Q2 Hiring Plan

Thanks for the update, Robert. Quick thoughts on the proposed salaries:

- The Trading desk analyst role at $185K base is above our band for L6. I'd recommend $170K max with a sign-on bonus to bridge the gap.
- The compliance hire at $145K is reasonable given the market.
- For the VP Risk role, we can go to $240K but I'd need CHRO approval above $225K.

Also, we should discuss James Morton's promotion — he's been at band minimum for 18 months and his manager is pushing for an exception. Let's take this offline.

Karen

**NOTE:** Karen intended to reply only to Robert Chen (Head of Talent Acquisition) but hit Reply All, sending salary band details, specific employee compensation discussions, and hiring budget parameters to all 32 department directors.

### Why This Severity

**WHO** — VP HR, accidental reply-all (not malicious). **WHAT** — Salary bands, specific compensation figures, named employee salary discussion, and budget approval thresholds. All sent to a broad internal audience. **WHO received** — 32 department directors (all internal, all management level, but many who shouldn't see specific salary discussions or bands for other departments). This is Medium because: the exposure is internal (not external), the recipients are all management (lower risk than general staff), and the intent is clearly accidental. However, salary band details and named employee compensation discussions can create significant HR issues (equity concerns, morale, bargaining leverage). The James Morton discussion is particularly sensitive. Immediate action: recall the email, notify CHRO, and assess whether any recipients will need individual follow-up regarding the salary information exposed.

---

## Example 42: Loan Approval Process Screenshots Shared on LinkedIn (Banking)

**Severity: MEDIUM**

### Sender Context
- **Name:** Jennifer Obi
- **Role:** Digital Banking Product Manager
- **Department:** Digital Channels
- **Tenure:** 2 years (joined Feb 2024)
- **Risk Factors:** None. Building professional brand on LinkedIn.

### Email (LinkedIn post notification, detected by social media monitoring)

**From:** jennifer.obi@centraltrustbank.com (LinkedIn profile)
**To:** LinkedIn public post
**Date:** Tuesday, Feb 18, 2026, 8:00 AM
**Subject:** [LinkedIn Post] "Proud of what we're building at Central Trust Bank!"

Proud of what we're building at Central Trust Bank! Our new digital lending platform has cut loan approval times from 5 days to under 4 hours. Here's a peek at the journey we've been on over the past 6 months.

[Screenshots attached to LinkedIn post showing:]
1. Internal dashboard with loan processing metrics
2. System architecture diagram for the new lending platform
3. Before/after comparison with specific volume numbers
4. UI mockup showing customer-facing loan application flow

**The screenshots contain:** Approval rate percentages, average loan sizes, system component names, vendor logos (identifying technology stack), internal KPIs, and a visible test account showing "John Doe" with realistic-looking account numbers.

### Why This Severity

**WHO** — Digital product manager, building professional brand, no malicious intent. **WHAT** — Internal metrics, architecture diagrams, and a test account with realistic-looking data shared publicly on LinkedIn. Reveals technology stack, performance metrics, and system design. **WHO received** — LinkedIn public audience (potentially including competitors, threat actors). This is Medium because: the intent is professional pride (not malicious), the data is operational (not customer PII), and the test account is synthetic. However, the architecture diagram reveals technology stack and design patterns (security concern), the performance metrics reveal business strategy, and the test account might be based on real data patterns. Coach on social media policy, request removal of screenshots containing system architecture and internal metrics, and verify test data is truly synthetic.

---

## Example 43: Payroll File Sent to Wrong Department (Banking)

**Severity: MEDIUM**

### Sender Context
- **Name:** Wei Chen
- **Role:** Payroll Administrator
- **Department:** HR Operations
- **Tenure:** 4 years (joined Mar 2022)
- **Risk Factors:** None. Misdirected internal email.

### Email

**From:** wei.chen@atlasbank.com
**To:** finance-ops@atlasbank.com (WRONG — should be payroll-processing@atlasbank.com)
**Date:** Wednesday, Feb 19, 2026, 9:00 AM
**Subject:** February payroll batch - ready for processing

Team,

February payroll batch is ready for processing. Please review and confirm by 2 PM for the Friday pay run.

Thanks,
Wei


### Why This Severity

**WHO** — Payroll administrator, routine task, misdirected email. **WHAT** — Complete payroll file with highly sensitive employee financial data including partial SSNs and bank account numbers. **WHO received** — Finance Operations team (internal, but not authorized for payroll data — they handle different financial operations). This is Medium because: the exposure is internal (significantly lower risk than external), the finance team likely has some sensitivity training, and the error is a misdirected email (not malicious). However, 1,247 employees' salary and banking data exposed to unauthorized internal recipients is significant. Recall the email, confirm deletion by finance ops team, notify HR management, and coach on distribution list verification for sensitive payroll data. If any finance ops team members have reported conflicts of interest with HR (e.g., salary disputes), escalate to High.

---

## Example 44: API Integration Credentials in Slack Message (Fintech)

**Severity: MEDIUM**

### Sender Context
- **Name:** Chris Park
- **Role:** Integration Engineer
- **Department:** Platform Engineering
- **Tenure:** 1.5 years (joined Aug 2024)
- **Risk Factors:** None. Junior engineer, likely doesn't know the credential sharing policy.

### Email (Slack message in #dev-integrations channel, 47 members)

**From:** chris.park@paynext.io
**To:** #dev-integrations Slack channel (47 members)
**Date:** Wednesday, Feb 19, 2026, 2:15 PM
**Subject:** [Slack] Sandbox API keys for Stripe integration

Hey everyone — for those working on the Stripe integration, here are the sandbox credentials:

API Key: sk_test_XXXX_EXAMPLE_NOT_REAL_KEY
Secret: whsec_5d7aef73e1a8b33c2fe490d56ec7b
Webhook URL: https://staging.paynext.io/api/webhooks/stripe

These are sandbox only, NOT production. Let me know if you need help with the integration setup!

### Why This Severity

**WHO** — Junior integration engineer, helpful intent, no risk factors. **WHAT** — API credentials shared in a Slack channel. While labeled "sandbox," credential sharing in unencrypted channels creates risks: sandbox keys might have production-like access, the pattern normalizes credential sharing, and Slack messages are searchable and retained. **WHO received** — Internal Slack channel with 47 members (broader than necessary). This is Medium because: the credentials are labeled sandbox (lower risk than production), the sharing is internal, and the intent is helpful team collaboration. However, credential sharing in plaintext channels violates security best practices, could normalize dangerous behavior, and the credentials should be verified as truly sandbox-only. Coach on using secret management tools (Vault, AWS Secrets Manager), rotate the shared credentials, and verify sandbox isolation.

---

## Example 45: Compliance Training Records Exported (Banking)

**Severity: LOW**

### Sender Context
- **Name:** Nicole Torres
- **Role:** Training Coordinator
- **Department:** Learning & Development
- **Tenure:** 3 years (joined Feb 2023)
- **Risk Factors:** None. Preparing quarterly compliance training report.

### Recipient Context
- **Name:** Julia Santos
- **Organization:** ComplianceTrack (LMS vendor)
- **Relationship:** Active LMS vendor, DPA in place, annual reporting contract.

### Email

**From:** nicole.torres@firstnationalbank.com
**To:** reporting@compliancetrack.com
**Date:** Monday, Feb 17, 2026, 11:00 AM
**Subject:** Q4 2025 training completion data for audit report

Julia,

Here's the Q4 training completion data for the regulatory audit report. Same format as last quarter.

Thanks,
Nicole


### Why This Severity

**WHO** — Training coordinator, routine reporting task, no risk factors. **WHAT** — Training completion records. Contains employee names and IDs but in the context of compliance training tracking (required by regulators). No financial data, no customer data, no sensitive business information. **WHO received** — Contracted LMS vendor with DPA, for their standard reporting deliverable. This is Low because: the data is operational (training records), the vendor is authorized, the purpose is regulatory compliance reporting, and the sensitivity level is minimal. The employee names and IDs are necessary for the report. Auto-verify vendor DPA status and close.

---

## Example 46: Customer KYC Documents Shared for Account Opening (Banking)

**Severity: LOW**

### Sender Context
- **Name:** Michael Rivera
- **Role:** KYC Analyst
- **Department:** Client Onboarding
- **Tenure:** 2 years (joined Feb 2024)
- **Risk Factors:** None. Standard account opening workflow.

### Recipient Context
- **Name:** Compliance Review Team (internal)
- **Relationship:** Internal team responsible for enhanced due diligence.

### Email

**From:** michael.rivera@atlasbank.com
**To:** edd-review@atlasbank.com
**Date:** Wednesday, Feb 19, 2026, 10:00 AM
**Subject:** EDD package - New corporate account: Horizon Technologies

EDD Team,

Please find attached the enhanced due diligence package for new corporate account application: Horizon Technologies Ltd (UK).

The automated screening flagged a partial name match on the beneficial owner. I've included the supporting documentation for your review.

Thanks,
Michael


### Why This Severity

**WHO** — KYC analyst, standard workflow, no risk factors. **WHAT** — KYC documents including personal identification. Sensitive under privacy regulations but this is the standard EDD workflow. **WHO received** — Internal EDD review team (authorized, appropriate escalation). This is Low because: the workflow is entirely internal and standard, the recipient team is specifically authorized for EDD review, and this is required regulatory process. Auto-resolve. The partial sanctions name match should be tracked for the EDD team's resolution but doesn't affect the severity of the email itself.

---

## Example 47: Branch Performance Report Shared with Regional Manager

**Severity: LOW**

### Sender Context
- **Name:** Amy Foster
- **Role:** Branch Manager
- **Department:** Retail Banking
- **Tenure:** 10 years (joined Jun 2016)
- **Risk Factors:** None.

### Email

**From:** amy.foster@centraltrustbank.com
**To:** regional.manager@centraltrustbank.com
**Date:** Tuesday, Feb 18, 2026, 4:00 PM
**Subject:** January branch performance - Westside location

Hi David,

Here's the January performance report for the Westside branch. We exceeded our new account targets by 15% but are slightly behind on mortgage originations.

I'd like to discuss staffing for the spring campaign at our next one-on-one.

Amy


### Why This Severity

**WHO** — Branch manager reporting to regional manager (standard hierarchy). **WHAT** — Branch performance metrics. Aggregated operational data, no customer PII, no sensitive strategic information. **WHO received** — Direct manager (appropriate recipient). This is Low because: this is completely standard management reporting, the content contains no customer data, the recipient is the direct supervisor, and the information is branch-level aggregate. Auto-resolve.

---

## Example 48: Interest Rate Sensitivity Analysis Shared During ALCO Meeting Prep (Banking)

**Severity: MEDIUM**

### Sender Context
- **Name:** Daniel Nguyen
- **Role:** Treasury Analyst
- **Department:** Asset-Liability Management
- **Tenure:** 3 years (joined Feb 2023)
- **Risk Factors:** None. Preparing for quarterly ALCO meeting.

### Email

**From:** daniel.nguyen@meridianbank.com
**To:** alco-members@meridianbank.com
**CC:** daniel.nguyen@meridianbank.com
**BCC:** prof.williams@university-finance.edu
**Date:** Monday, Feb 17, 2026, 3:00 PM
**Subject:** Q1 ALCO Materials - Interest Rate Sensitivity & Liquidity Analysis

ALCO Members,

Please find attached the Q1 materials for Thursday's ALCO meeting. Key highlights:

- NIM compression of 12bps under the +200bps shock scenario
- Liquidity coverage ratio at 118% (above 100% minimum)
- Duration gap narrowing from 2.3 years to 1.8 years
- Proposed hedge strategy for the mortgage portfolio

See you Thursday.

Daniel


**Note:** AXIA detected a BCC recipient: prof.williams@university-finance.edu — Daniel's former graduate advisor. Not an authorized recipient for ALCO materials.

### Why This Severity

**WHO** — Treasury analyst with legitimate access, but BCC'd an unauthorized external recipient. **WHAT** — Complete ALCO materials: interest rate sensitivity, liquidity position, capital adequacy, and proposed hedging strategies. This is highly sensitive bank strategic information. **WHO received** — Legitimate internal distribution (ALCO members) PLUS an unauthorized BCC to a university professor. This is Medium (bordering High) because: the BCC to an external academic suggests either an intentional information sharing relationship (academic collaboration) or a serious judgment lapse. The ALCO materials reveal the bank's interest rate risk position and hedging strategy — information that could be valuable to bond traders or competitive institutions. The BCC (rather than CC) suggests awareness that this sharing might be questioned. Manager notification and investigation of the academic relationship are required. If the professor has connections to financial institutions or advisory roles, escalate to High.

---

## Example 49: Merger Integration Plan Discussed on Personal Phone (Fintech)

**Severity: HIGH**

### Sender Context
- **Name:** Robert Zhang
- **Role:** VP of Strategy
- **Department:** Corporate Development
- **Tenure:** 5 years (joined Mar 2021)
- **Risk Factors:** Just returned from a private meeting with the CEO and board. Known to have a close relationship with a journalist at TechCrunch who covers fintech M&A.

### Email

**From:** robert.zhang@rapidpay.com
**To:** robert.zhang.private@signal.me (Signal messaging bridge email)
**Date:** Wednesday, Feb 19, 2026, 6:45 PM
**Subject:** Notes from today's meeting

Sending myself the notes from today's strategy session.

Board meeting key decisions:
- Acquisition of PayFlow Technologies approved: $175M cash + stock
- Target close date: March 15 announcement, April 30 regulatory filing
- Integration plan: 18 months, 3 phases
- PayFlow engineering team: 40% reduction planned (keep top 5 with $2M retention packages each)
- CEO/CFO of PayFlow: termination at close, 12-month severance
- Code name: Project Atlas (board confidential, pre-announcement MNPI)

Need to review the integration timeline before Friday's follow-up with the board.


### Why This Severity

**WHO** — VP Strategy with full access to M&A strategy, known to have journalist relationship in the fintech M&A space. **WHAT** — Board-confidential acquisition details: target company, price, timeline, personnel decisions, and planned announcement date. This is material non-public information. **WHO received** — Signal messaging bridge (encrypted messaging, difficult to trace). The choice of Signal rather than personal email suggests awareness of monitoring. This is High because: the content is extremely sensitive (MNPI, board-confidential M&A), the recipient channel is deliberately opaque (Signal), and the sender has a known journalist relationship. However, it's not yet Critical because there's no direct evidence of journalist communication, and "sending to self" could be a legitimate (if policy-violating) personal backup. If investigation reveals the Signal address connects to anyone other than Robert, escalate immediately to Critical with legal preservation and SEC considerations.

---

## Example 50: Customer Database Migration File Left on Shared Drive (Fintech)

**Severity: HIGH**

### Sender Context
- **Name:** Systems Migration (automated process, configured by IT team)
- **Role:** N/A (automated)
- **Department:** IT Infrastructure
- **Responsible Person:** Sam Okafor, Senior Systems Administrator
- **Risk Factors:** Misconfigured automated process. Sam has been working overtime on the database migration project and may have inadvertently used the wrong destination path.

### Email (Automated notification from the migration tool)

**From:** migration-service@paynext.io (automated)
**To:** sam.okafor@paynext.io
**CC:** it-ops@paynext.io
**Date:** Wednesday, Feb 19, 2026, 3:00 AM
**Subject:** Migration batch complete - Customer DB export

Migration batch completed successfully.

Source: Production Customer Database (PostgreSQL)
Destination: \\shared-drive\public\migrations\customer_db_export_feb2026\
Records: 847,000 customer records
Status: Complete
Duration: 4h 23m

File manifest:
- customers_full.csv (847,000 records)
- transactions_2025.csv (12.4M records)
- payment_methods.csv (1.2M records)
- account_balances.csv (847,000 records)

All files exported without encryption per migration configuration.

### Why This Severity

**WHO** — Automated process configured by an overworked systems admin. The human element is Sam's configuration error, not malicious intent. **WHAT** — Complete customer database: 847,000 customer records, 12.4M transactions, payment methods, and account balances. This is PCI DSS scope data (payment methods) and comprehensive PII. Exported without encryption. **WHO received** — Public shared drive accessible to ALL employees (potentially hundreds of people). Not external, but far broader than authorized access. This is High because: the data volume is massive (847K customers), includes payment data (PCI DSS), is unencrypted, and is on a publicly accessible internal share. Every minute the data sits there increases exposure. Immediate action required: remove files from public share, assess who accessed the directory during the exposure window, verify no external access to the shared drive, and conduct PCI DSS breach assessment. If the shared drive has any external access (VPN, cloud sync), escalate immediately to Critical.

---

## Distribution Summary

| Severity | Count | Examples |
|----------|-------|----------|
| **Critical** | 12 | #1-#12 |
| **High** | 8 | #13-#20, #49-#50 |
| **Medium** | 18 | #21-#30, #41-#44, #48 |
| **Low** | 12 | #31-#40, #45-#47 |

### Industry Breakdown

| Industry | Examples |
|----------|----------|
| **Banking** | #3, #5, #7, #10, #11, #12, #13, #17, #18, #23, #24, #26, #29, #30, #34, #36, #37, #41, #42, #43, #45, #46, #47, #48 |
| **Fintech** | #2, #4, #6, #8, #9, #15, #20, #22, #25, #27, #28, #38, #44, #49, #50 |
| **General / Cross-Industry** | #1, #14, #16, #19, #21, #31, #32, #33, #35, #39, #40 |

### WHO/WHAT/WHO Dimension Coverage

| WHO Factor | Examples |
|------------|----------|
| Departing employee | #1, #6, #9, #11, #14, #40 |
| Role mismatch (shouldn't have this data) | #4, #7, #8, #12, #19 |
| Behavioral anomaly (timing, volume) | #5, #7, #8, #15, #48 |
| Clean record / accidental | #21, #24, #33, #41, #43 |
| External indicators (LinkedIn, recruiter) | #1, #6, #13, #19, #49 |
| Contractor / short tenure | #8, #44 |
| Grievance / conflict | #7, #10 |

| WHAT Factor | Examples |
|-------------|----------|
| Source code / algorithms | #1, #6, #9, #19, #32 |
| Customer PII / financial data | #8, #11, #12, #14, #15, #16, #24, #28, #50 |
| M&A / board materials | #3, #10, #18, #29, #49 |
| Regulatory / compliance data | #7, #17, #30, #37, #46 |
| Pre-release financial data | #4 |
| Product roadmaps / strategy | #2, #21, #42 |
| Credentials / API keys | #5, #9, #44 |
| Compensation / HR data | #23, #41, #43 |
| Wire / payment instructions | #5 |

| WHO RECEIVED Factor | Examples |
|---------------------|----------|
| Personal email | #1, #4, #6, #7, #8, #9, #11, #14, #15, #19, #40 |
| Competitor employee | #3, #13 |
| Vendor (authorized) | #17, #20, #25, #30, #31, #38, #45 |
| Vendor (outside scope) | #17, #20, #25 |
| Public / social media | #22, #26, #42 |
| Wrong internal recipient | #24, #41, #43 |
| Media / journalist | #10, #49 |
| Investment professional | #4, #48 |
| Encrypted/anonymous channel | #6, #49 |

---

*Document generated for AXIA LLM severity testing. Each example is designed to test the model's ability to apply the WHO/WHAT/WHO judgment framework rather than simple pattern matching.*
