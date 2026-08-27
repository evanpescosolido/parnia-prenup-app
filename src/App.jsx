import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Globe2,
  HeartHandshake,
  Home,
  Landmark,
  Scale,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { stateRules } from "./data/stateRules";

const initialAnswers = {
  mode: "prenup",
  state: "MA",
  relationshipStage: "",
  weddingMonths: "",
  discussedWithPartner: "",
  counsel: "",
  disclosureStarted: "",
  currentAssets: [],
  futureAssets: [],
  internationalAssets: "",
  incomeGap: "",
  debts: "",
  business: "",
  realEstate: "",
  children: "",
  careerSacrifice: "",
  pressure: ""
};

const steps = [
  { id: "path", label: "Path", icon: HeartHandshake },
  { id: "timing", label: "Timing", icon: AlertTriangle },
  { id: "assets", label: "Assets", icon: Landmark },
  { id: "complexity", label: "Complexity", icon: Globe2 },
  { id: "report", label: "Report", icon: FileText }
];

const assetOptions = [
  "Savings or investment accounts",
  "Retirement accounts",
  "Real estate",
  "Business ownership",
  "Family gifts",
  "Expected inheritance",
  "Student loans",
  "Credit card or personal debt"
];

const futureAssetOptions = [
  "Future inheritance",
  "Foreign inheritance",
  "Family business interest",
  "Future home purchase",
  "Appreciation of separate property",
  "Income from separate property"
];

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function scoreAnswers(answers) {
  let score = 0;
  const reasons = [];

  if (answers.mode === "postnup") {
    score += 2;
    reasons.push("Postnup planning usually deserves extra process attention because the parties are already married or partnered.");
  }

  const months = Number(answers.weddingMonths);
  if (answers.mode === "prenup" && answers.weddingMonths !== "") {
    if (months < 2) {
      score += 3;
      reasons.push("The wedding timeline is short, which can make voluntariness and review time especially important.");
    } else if (months < 6) {
      score += 1;
      reasons.push("The wedding is approaching soon enough that early document gathering and counsel conversations matter.");
    }
  }

  if (answers.futureAssets.length > 0) {
    score += Math.min(3, answers.futureAssets.length);
    reasons.push("Future gifts, inheritances, appreciation, or business growth should be handled expressly instead of assumed.");
  }

  if (answers.internationalAssets === "yes") {
    score += 3;
    reasons.push("International assets can involve foreign ownership, inheritance, tax, and enforcement questions.");
  }

  ["business", "realEstate", "incomeGap", "careerSacrifice", "debts", "children"].forEach((key) => {
    if (answers[key] === "yes") score += 1;
  });

  if (answers.pressure === "yes") {
    score += 2;
    reasons.push("Any pressure or rushed process should be discussed with counsel before relying on an agreement.");
  }

  const level = score >= 8 ? "High" : score >= 4 ? "Moderate" : "Lower";
  return { score, level, reasons };
}

function FieldGroup({ title, children }) {
  return (
    <section className="field-group">
      <h2>{title}</h2>
      <div className="field-stack">{children}</div>
    </section>
  );
}

function ChoiceButton({ active, children, onClick }) {
  return (
    <button className={active ? "choice active" : "choice"} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

function YesNo({ value, onChange }) {
  return (
    <div className="segmented" role="group">
      <button className={value === "yes" ? "active" : ""} type="button" onClick={() => onChange("yes")}>
        Yes
      </button>
      <button className={value === "no" ? "active" : ""} type="button" onClick={() => onChange("no")}>
        No
      </button>
      <button className={value === "unsure" ? "active" : ""} type="button" onClick={() => onChange("unsure")}>
        Unsure
      </button>
    </div>
  );
}

function App() {
  const [answers, setAnswers] = useState(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const rule = stateRules[answers.state];
  const result = useMemo(() => scoreAnswers(answers), [answers]);

  const setAnswer = (key, value) => setAnswers((current) => ({ ...current, [key]: value }));
  const step = steps[stepIndex];

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <Scale size={28} aria-hidden="true" />
          <div>
            <p>Prenup Planner</p>
            <span>Readiness and issue spotting</span>
          </div>
        </div>

        <nav className="step-list" aria-label="Planner sections">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                className={index === stepIndex ? "step active" : "step"}
                key={item.id}
                type="button"
                onClick={() => setStepIndex(index)}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="boundary-note">
          <ShieldCheck size={18} aria-hidden="true" />
          <p>Educational planning only. This tool does not draft an agreement or replace legal counsel.</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Prototype v1</p>
            <h1>{step.label}</h1>
          </div>
          <div className={`score-pill ${result.level.toLowerCase()}`}>
            <Sparkles size={16} aria-hidden="true" />
            {result.level} planning value
          </div>
        </header>

        <div className="panel">
          {step.id === "path" && (
            <FieldGroup title="Choose the planning path">
              <div className="choice-grid two">
                <ChoiceButton active={answers.mode === "prenup"} onClick={() => setAnswer("mode", "prenup")}>
                  <BadgeCheck size={22} aria-hidden="true" />
                  <strong>Prenup readiness</strong>
                  <span>For someone considering marriage or already engaged.</span>
                </ChoiceButton>
                <ChoiceButton active={answers.mode === "postnup"} onClick={() => setAnswer("mode", "postnup")}>
                  <HeartHandshake size={22} aria-hidden="true" />
                  <strong>Postnup readiness</strong>
                  <span>For someone already married or in a legal partnership.</span>
                </ChoiceButton>
              </div>

              <label>
                State law context
                <select value={answers.state} onChange={(event) => setAnswer("state", event.target.value)}>
                  {Object.entries(stateRules).map(([code, state]) => (
                    <option value={code} key={code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="state-summary">
                <Scale size={20} aria-hidden="true" />
                <div>
                  <strong>{rule.propertySystem}</strong>
                  <p>{answers.mode === "prenup" ? rule.prenupContext : rule.postnupContext}</p>
                </div>
              </div>
            </FieldGroup>
          )}

          {step.id === "timing" && (
            <FieldGroup title={answers.mode === "prenup" ? "Wedding timing and process" : "Postnup process readiness"}>
              {answers.mode === "prenup" && (
                <label>
                  How many months away is the wedding?
                  <input
                    min="0"
                    type="number"
                    value={answers.weddingMonths}
                    onChange={(event) => setAnswer("weddingMonths", event.target.value)}
                    placeholder="Example: 8"
                  />
                </label>
              )}

              <label>
                Has the topic been discussed with the other person?
                <YesNo value={answers.discussedWithPartner} onChange={(value) => setAnswer("discussedWithPartner", value)} />
              </label>

              <label>
                Has either person spoken with an attorney?
                <YesNo value={answers.counsel} onChange={(value) => setAnswer("counsel", value)} />
              </label>

              <label>
                Have financial disclosures or documents been started?
                <YesNo value={answers.disclosureStarted} onChange={(value) => setAnswer("disclosureStarted", value)} />
              </label>

              <label>
                Is anyone feeling rushed or pressured?
                <YesNo value={answers.pressure} onChange={(value) => setAnswer("pressure", value)} />
              </label>
            </FieldGroup>
          )}

          {step.id === "assets" && (
            <FieldGroup title="Current and future assets">
              <div>
                <p className="label-text">Current financial topics</p>
                <div className="chip-grid">
                  {assetOptions.map((asset) => (
                    <button
                      className={answers.currentAssets.includes(asset) ? "chip selected" : "chip"}
                      key={asset}
                      type="button"
                      onClick={() => setAnswer("currentAssets", toggleValue(answers.currentAssets, asset))}
                    >
                      {asset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="label-text">Future asset topics</p>
                <div className="chip-grid">
                  {futureAssetOptions.map((asset) => (
                    <button
                      className={answers.futureAssets.includes(asset) ? "chip selected" : "chip"}
                      key={asset}
                      type="button"
                      onClick={() => setAnswer("futureAssets", toggleValue(answers.futureAssets, asset))}
                    >
                      {asset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="state-summary">
                <Landmark size={20} aria-hidden="true" />
                <p>{rule.futureAssets}</p>
              </div>
            </FieldGroup>
          )}

          {step.id === "complexity" && (
            <FieldGroup title="Complexity flags">
              <label>
                Are any current or expected assets outside the United States?
                <YesNo value={answers.internationalAssets} onChange={(value) => setAnswer("internationalAssets", value)} />
              </label>

              <label>
                Is there a meaningful income or wealth gap?
                <YesNo value={answers.incomeGap} onChange={(value) => setAnswer("incomeGap", value)} />
              </label>

              <label>
                Does either person own or expect to own a business?
                <YesNo value={answers.business} onChange={(value) => setAnswer("business", value)} />
              </label>

              <label>
                Is real estate involved?
                <YesNo value={answers.realEstate} onChange={(value) => setAnswer("realEstate", value)} />
              </label>

              <label>
                Are debts, student loans, children, or career sacrifices part of the picture?
                <div className="mini-grid">
                  <span>Debt</span>
                  <YesNo value={answers.debts} onChange={(value) => setAnswer("debts", value)} />
                  <span>Children</span>
                  <YesNo value={answers.children} onChange={(value) => setAnswer("children", value)} />
                  <span>Career sacrifice</span>
                  <YesNo value={answers.careerSacrifice} onChange={(value) => setAnswer("careerSacrifice", value)} />
                </div>
              </label>

              <div className="state-summary">
                <Globe2 size={20} aria-hidden="true" />
                <p>{rule.international}</p>
              </div>
            </FieldGroup>
          )}

          {step.id === "report" && (
            <section className="report">
              <div className="report-header">
                <div>
                  <p className="eyebrow">Planning report</p>
                  <h2>{result.level} value in discussing an agreement</h2>
                </div>
                <div className={`score-badge ${result.level.toLowerCase()}`}>{result.score}</div>
              </div>

              <div className="report-grid">
                <article>
                  <h3>Why this may matter</h3>
                  <ul>
                    {(result.reasons.length ? result.reasons : ["The current answers show fewer major complexity flags, but state-law process and disclosure still matter."]).map(
                      (reason) => (
                        <li key={reason}>{reason}</li>
                      )
                    )}
                  </ul>
                </article>

                <article>
                  <h3>State context</h3>
                  <p>{answers.mode === "prenup" ? rule.prenupContext : rule.postnupContext}</p>
                  <p>{rule.timing}</p>
                </article>

                <article>
                  <h3>Attorney discussion topics</h3>
                  <ul>
                    <li>Whether independent counsel is recommended for each person.</li>
                    <li>What financial disclosure should be prepared before negotiation.</li>
                    <li>How future inheritances, gifts, appreciation, and commingling should be handled.</li>
                    <li>Whether international assets require local counsel in another country.</li>
                  </ul>
                </article>

                <article>
                  <h3>Source notes</h3>
                  <ul>
                    {rule.sourceNotes.map((source) => (
                      <li key={source}>{source}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          )}
        </div>

        <footer className="controls">
          <button type="button" onClick={() => setStepIndex(Math.max(0, stepIndex - 1))} disabled={stepIndex === 0}>
            <ArrowLeft size={17} aria-hidden="true" />
            Back
          </button>
          <button
            className="primary"
            type="button"
            onClick={() => setStepIndex(Math.min(steps.length - 1, stepIndex + 1))}
            disabled={stepIndex === steps.length - 1}
          >
            Next
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </footer>
      </section>
    </main>
  );
}

export default App;
