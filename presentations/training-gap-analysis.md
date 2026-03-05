# AXIA Training Data vs. Severity Benchmark: Gap Analysis

**Date**: 2026-03-03 | **Analyst**: Yohay Etsion (Fractional CPO)

---

## Executive Summary

We compared AXIA's 28,495-record training dataset (`financial_services_training_v2.csv`) against AXIA's own severity classification guidelines and 55 benchmark examples. The findings reveal a **fundamental alignment gap**: the training data classifies documents by **content sensitivity** (what PII/data is present), while AXIA's guidelines classify by **behavioral risk** (why data is moving and where it's going).

**Key numbers:**
- **37.4% agreement** between training labels and AXIA guideline-based classification
- **0 of 55** AXIA benchmark examples are fully covered by training data
- **32 of 55** have zero training coverage at all
- **63 of 67 disagreements** are severity downgrades (training over-labels)

---

## Part 1: Classification Comparison

### How Claude Would Classify vs. Original Labels

Applied AXIA's severity guidelines to 115 stratified samples from the training data.

#### Confusion Matrix

| Original \ AXIA | Critical | High | Medium | Low | Non-Sensitive |
|-----------------|----------|------|--------|-----|---------------|
| **Critical** | **10** | 1 | 5 | 1 | 0 |
| **High** | 2 | **2** | 8 | 4 | 2 |
| **Medium** | 0 | 1 | **3** | 4 | 16 |
| **Low** | 0 | 0 | 1 | **1** | 22 |
| **Non-Sensitive** | 0 | 0 | 0 | 0 | **24** |

#### Agreement Rate by Severity

| Level | Agree | Total | Rate | Direction of Errors |
|-------|-------|-------|------|---------------------|
| Non-Sensitive | 24 | 24 | **100%** | Perfect |
| Critical | 10 | 17 | **58.8%** | 7 downgraded (topic =/= risk) |
| Medium | 3 | 24 | **12.5%** | 20 downgraded to non-sensitive/low |
| High | 2 | 18 | **11.1%** | 14 downgraded |
| Low | 1 | 24 | **4.2%** | 22 downgraded to non-sensitive |

#### Key Patterns

1. **Massive over-labeling of Enron emails**: Labeled by topic area (energy trading = high, regulatory = critical) rather than actual data sensitivity. Most are routine internal emails with no PII, no regulated data, no malicious recipient.

2. **Slack content systematically over-labeled**: DevOps/infrastructure discussions (Flyte, Kubernetes, AWS IAM) labeled "medium" when they're non-sensitive under AXIA's framework. Technical complexity was treated as data sensitivity.

3. **Non-sensitive boundary is well-calibrated**: 100% agreement. When the training data says "not sensitive," it's right.

4. **Critical catches are real**: SSN+financial PII disclosures, cleartext credentials, and explicit insider trading messages were correctly identified as critical.

5. **Two correct upgrades found**: Wire transfer with account+SWIFT code (high -> critical), HR report with SSN alongside real name (high -> critical). These contain regulated PII that meets AXIA's critical threshold.

---

## Part 2: Use Case Coverage

### AXIA Benchmark Examples vs. Training Data

| Coverage Level | Count | Percentage |
|---------------|-------|------------|
| **Fully covered** | 0 | 0% |
| **Partial** (document-type match, no behavioral context) | 23 | 42% |
| **Not covered at all** | 32 | 58% |

### Missing from Training Data (Critical AXIA Scenarios)

These AXIA benchmark scenarios have ZERO representation in the training data:

| # | Scenario | Why It Matters |
|---|----------|---------------|
| 1 | Source code exfiltration to competitor | Core IP theft - no code content in training data |
| 2 | Encrypted archive bypassing DLP | DLP evasion pattern - no concealment scenarios |
| 6 | Trading algorithm exfiltration | Quant IP theft - no algorithm content |
| 8 | Credit card data exfiltration (disguised) | PCI data with concealment - no disguise patterns |
| 9 | API keys/credentials exfiltration | Payment system access - only weak Slack match |
| 17 | SAR data beyond contract scope | AML regulatory - no SAR content |
| 20 | M&A plan via encrypted messaging | DLP bypass + MNPI - no M&A documents |
| 49 | Database migration on public drive | Cloud misconfiguration - no infrastructure scenarios |
| 51 | Sanctions evasion via shell entities | Financial crime - no sanctions content |
| 52 | Insider trading with coded language | Behavioral concealment - no obfuscation patterns |
| 53 | Banking credentials to dark web | Credential theft - no dark web scenarios |
| 54 | Biometric voiceprint exfiltration | Biometric privacy - no biometric content |

### Training Topics NOT in AXIA Benchmarks

7 training topics (1,957 samples) have no AXIA benchmark equivalent:

| Topic | Samples | Assessment |
|-------|---------|------------|
| Employee Benefits & Tax Forms | 729 | IRM-relevant but un-benchmarked |
| Daily Market Commentary | 431 | Low risk, probably noise |
| System Maintenance Notification | 234 | Not an IRM scenario |
| Health/Life Insurance Claims | 225 | PII-heavy but un-benchmarked |
| Quarterly Business Review | 115 | Low risk |
| IT Security Patch Notes | 115 | Not an IRM scenario |
| Compliance Policy Update | 108 | Low risk |

### Behavioral Signal Gaps

AXIA's guidelines rely heavily on behavioral signals that are **completely absent** from the training data:

| Behavioral Signal | AXIA Examples | Training Data Coverage |
|-------------------|---------------|----------------------|
| Departing employee pattern | #1, #11, #14, #40 | None |
| Off-hours access | #5, #15 | None |
| DLP bypass / encryption | #2, #8, #20 | None |
| Bulk/mass export | #14, #15 | None |
| API automation abuse | #15 | None |
| Coded language / obfuscation | #52 | None |
| Wrong recipient / autocomplete | #24, #33, #41, #43 | None |
| Destination analysis | Throughout | None |

---

## Part 3: The Fundamental Gap

### What the Training Data Teaches

The model learns: **"Documents containing SSNs, account numbers, or salary data are sensitive. Documents without PII are not."**

This is a PII/content classifier. It answers: **"What does this document contain?"**

### What AXIA's Guidelines Require

AXIA's framework asks: **"Why is this data moving, where is it going, and who is sending it?"**

The same document can be:
- **Low** when sent by authorized payroll to internal HR
- **Critical** when exported by a departing employee to personal Gmail at 2 AM

### The Consequence

| Scenario | Training Data Label | AXIA Label | Why They Differ |
|----------|-------------------|------------|-----------------|
| Authorized payroll file to HR | Critical (has SSNs) | Low (authorized, internal) | Training sees PII; AXIA sees authorization |
| Coded insider trading ("garden update") | Low (no PII) | Critical (coded MNPI) | Training sees no PII; AXIA sees intent |
| Resume to personal email (departing) | Low (personal data) | Low (personal files) | Rare agreement |
| Wire transfer, normal business | Critical (has account #) | Low (authorized transaction) | Training sees financial data; AXIA sees routine |
| Wire transfer, fraud attempt | Critical (has account #) | Critical (fraud signals) | Both flag it, but for different reasons |

---

## Recommendations

### 1. Generate Behavioral Scenario Training Data
Use the synthetic data pipeline to create scenarios matching AXIA's 55 examples. Each scenario should include the contextual metadata: sender role, departure status, recipient legitimacy, time-of-day, volume anomaly, concealment method.

### 2. Add Contrastive Pairs
For each document type, generate paired examples: same content, authorized vs. malicious context. This teaches the model that content alone doesn't determine severity.

### 3. Recalibrate Labels to Intent + Destination
Current labels are PII-density-based. AXIA needs intent-based labels. Consider re-labeling with the AXIA guidelines as the rubric.

### 4. Expand Domain Coverage
Priority synthetic data generation for the 32 uncovered AXIA scenarios, especially: source code, M&A documents, SAR/AML filings, credentials, sanctions, coded language, biometric data.

### 5. Add Metadata Signals to Training Data
The classification model needs access to: sender departure proximity, recipient domain analysis, access time patterns, export volume baselines, DLP event correlation.
