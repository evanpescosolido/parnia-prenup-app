const communityPropertyStates = new Set(["AZ", "CA", "ID", "LA", "NV", "NM", "TX", "WA", "WI"]);

const states = [
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"]
];

const stateSourceNotes = {
  AL: ["Ala. Code § 30-4-9 (contracts between spouses)", "Ala. Code § 30-2-51 (property division)"],
  AK: ["Alaska Stat. § 13.12.213 (waiver of spousal rights)", "Brooks v. Brooks, 733 P.2d 1044 (Alaska 1987); Alaska Stat. § 25.24.160(a)(4)"],
  AZ: ["Ariz. Rev. Stat. §§ 25-201 to 25-205 (Uniform Premarital Agreement Act)", "Ariz. Rev. Stat. §§ 25-211 and 25-318 (community property and division)"],
  AR: ["Ark. Code §§ 9-11-401 to 9-11-413 (Arkansas Premarital Agreement Act)", "Ark. Code § 9-12-315 (marital property division)"],
  CA: ["Cal. Fam. Code §§ 1500 and 1610-1617 (premarital agreements)", "Cal. Fam. Code §§ 721 and 760 (spousal fiduciary duties and community property)"],
  CO: ["Colo. Rev. Stat. §§ 14-2-301 to 14-2-313 (Uniform Premarital and Marital Agreements Act)", "Colo. Rev. Stat. § 14-10-113 (property disposition)"],
  CT: ["Conn. Gen. Stat. §§ 46b-36a to 46b-36j (Connecticut Premarital Agreement Act)", "Conn. Gen. Stat. § 46b-81 (property assignment)"],
  DE: ["13 Del. C. §§ 321-328 (premarital agreements)", "13 Del. C. § 1513 (disposition of marital property)"],
  FL: ["Fla. Stat. § 61.079 (Uniform Premarital Agreement Act)", "Fla. Stat. § 61.075 (equitable distribution)"],
  GA: ["Ga. Code §§ 19-3-62 to 19-3-67 (marriage articles and contracts)", "Ga. Code § 19-5-13 (disposition of property in divorce)"],
  HI: ["Haw. Rev. Stat. §§ 572D-1 to 572D-11 (Uniform Premarital Agreement Act)", "Haw. Rev. Stat. § 580-47 (property division and support)"],
  ID: ["Idaho Code §§ 32-921 to 32-929 (Uniform Premarital Agreement Act)", "Idaho Code §§ 32-903 and 32-906 (community and separate property)"],
  IL: ["750 Ill. Comp. Stat. 10/1 to 10/11 (Illinois Uniform Premarital Agreement Act)", "750 Ill. Comp. Stat. 5/503 (marital property and division)"],
  IN: ["Ind. Code §§ 31-11-3-1 to 31-11-3-10 (Uniform Premarital Agreement Act)", "Ind. Code § 31-15-7-5 (property division factors)"],
  IA: ["Iowa Code §§ 596.1 to 596.12 (Iowa Premarital Agreement Act)", "Iowa Code § 598.21 (disposition of property)"],
  KS: ["Kan. Stat. §§ 23-2401 to 23-2411 (Uniform Premarital Agreement Act)", "Kan. Stat. § 23-2802 (division of property)"],
  KY: ["Gentry v. Gentry, 798 S.W.2d 928 (Ky. 1990) (antenuptial-agreement review)", "Ky. Rev. Stat. § 403.190 (disposition of property)"],
  LA: ["La. Civ. Code arts. 2328-2336 (matrimonial agreements)", "La. Civ. Code arts. 2338-2341 (community and separate property)"],
  ME: ["19-A Me. Rev. Stat. §§ 601-611 (Uniform Premarital Agreement Act)", "19-A Me. Rev. Stat. § 953 (disposition of property)"],
  MD: ["Hartz v. Hartz, 248 Md. 47 (1967), and Cannon v. Cannon, 384 Md. 537 (2005) (agreement enforceability)", "Md. Code, Fam. Law §§ 8-103 and 8-205 (agreements and monetary awards)"],
  MA: ["Mass. Gen. Laws ch. 209, §§ 25-26 (antenuptial contracts)", "DeMatteo v. DeMatteo, 436 Mass. 18 (2002), and Ansin v. Craven-Ansin, 457 Mass. 283 (2010)"],
  MI: ["Mich. Comp. Laws § 557.28 (contracts concerning property)", "Rinvelt v. Rinvelt, 190 N.W.2d 371 (Mich. Ct. App. 1971); Mich. Comp. Laws § 552.23"],
  MN: ["Minn. Stat. § 519.11 (antenuptial and postnuptial contracts)", "Minn. Stat. § 518.58 (marital property division)"],
  MS: ["Mabus v. Mabus, 890 So. 2d 806 (Miss. 2003) (antenuptial agreements)", "Ferguson v. Ferguson, 639 So. 2d 921 (Miss. 1994) (equitable distribution factors)"],
  MO: ["Mo. Rev. Stat. §§ 451.220 and 474.120 (marriage contracts and spousal-right waivers)", "Mo. Rev. Stat. § 452.330 (marital property division)"],
  MT: ["Mont. Code §§ 40-2-601 to 40-2-610 (Uniform Premarital Agreement Act)", "Mont. Code § 40-4-202 (division of property)"],
  NE: ["Neb. Rev. Stat. §§ 42-1001 to 42-1011 (Uniform Premarital Agreement Act)", "Neb. Rev. Stat. § 42-365 (property division and support)"],
  NV: ["Nev. Rev. Stat. §§ 123A.010 to 123A.100 (Uniform Premarital Agreement Act)", "Nev. Rev. Stat. § 125.150 (division of property)"],
  NH: ["N.H. Rev. Stat. § 460:2-a (antenuptial contracts)", "N.H. Rev. Stat. § 458:16-a (property distribution)"],
  NJ: ["N.J. Stat. §§ 37:2-31 to 37:2-41 (Uniform Premarital and Pre-Civil Union Agreement Act)", "N.J. Stat. § 2A:34-23.1 (equitable distribution factors)"],
  NM: ["N.M. Stat. §§ 40-3A-1 to 40-3A-10 (Uniform Premarital Agreement Act)", "N.M. Stat. §§ 40-3-8 and 40-4-7 (community property and division)"],
  NY: ["N.Y. Domestic Relations Law § 236(B)(3) (marital agreements)", "N.Y. Domestic Relations Law § 236(B)(5) (equitable distribution)"],
  NC: ["N.C. Gen. Stat. §§ 52B-1 to 52B-11 (Uniform Premarital Agreement Act)", "N.C. Gen. Stat. § 50-20 (equitable distribution)"],
  ND: ["N.D. Cent. Code §§ 14-03.1-01 to 14-03.1-09 (Uniform Premarital Agreement Act)", "N.D. Cent. Code § 14-05-24 (property and debts)"],
  OH: ["Gross v. Gross, 11 Ohio St. 3d 99 (1984), and Ohio Rev. Code § 1335.05 (antenuptial agreements)", "Ohio Rev. Code § 3105.171 (marital and separate property)"],
  OK: ["Okla. Stat. tit. 43, § 121 (antenuptial contracts and property division)", "Okla. Stat. tit. 84, § 44 (waiver of spousal inheritance rights)"],
  OR: ["Or. Rev. Stat. §§ 108.700 to 108.740 (Uniform Premarital Agreement Act)", "Or. Rev. Stat. § 107.105 (property division)"],
  PA: ["23 Pa. Cons. Stat. § 3106 (premarital-agreement enforcement)", "23 Pa. Cons. Stat. § 3502 (equitable division of marital property)"],
  RI: ["R.I. Gen. Laws §§ 15-17-1 to 15-17-11 (Uniform Premarital Agreement Act)", "R.I. Gen. Laws § 15-5-16.1 (assignment of property)"],
  SC: ["Hardee v. Hardee, 355 S.C. 382 (2003) (antenuptial agreements)", "S.C. Code § 20-3-630 (marital property)"],
  SD: ["S.D. Codified Laws §§ 25-2-16 to 25-2-25 (marriage contracts)", "S.D. Codified Laws § 25-4-44 (property division)"],
  TN: ["Tenn. Code § 36-3-501 (prenuptial agreements)", "Tenn. Code § 36-4-121 (classification and division of marital property)"],
  TX: ["Tex. Fam. Code §§ 4.001 to 4.010 (premarital agreements)", "Tex. Fam. Code §§ 3.001-3.003 and 7.001 (property classification and division)"],
  UT: ["Utah Code §§ 30-8-1 to 30-8-9 (Uniform Premarital Agreement Act)", "Utah Code § 30-3-5 (property division and support)"],
  VT: ["Bassler v. Bassler, 156 Vt. 353 (1991) (antenuptial agreements)", "15 V.S.A. § 751 (property settlement)"],
  VA: ["Va. Code §§ 20-147 to 20-155 (Premarital Agreement Act)", "Va. Code § 20-107.3 (equitable distribution)"],
  WA: ["In re Marriage of Matson, 107 Wash. 2d 479 (1986), and RCW 26.16.120 (marital agreements)", "RCW 26.09.080 (disposition of property and liabilities)"],
  WV: ["W. Va. Code §§ 48-1-203 and 48-6-201 (antenuptial agreements and divorce orders)", "W. Va. Code §§ 48-7-101 to 48-7-111 (equitable distribution)"],
  WI: ["Wis. Stat. § 766.58 (marital property agreements)", "Wis. Stat. § 767.61 (property division)"],
  WY: ["Lund v. Lund, 849 P.2d 731 (Wyo. 1993) (antenuptial agreements)", "Wyo. Stat. § 20-2-114 (disposition of property)" ]
};

function buildRule(code, name) {
  const isCommunityProperty = communityPropertyStates.has(code);
  const propertySystem = isCommunityProperty ? "Community property" : "Equitable distribution";
  const propertyContext = isCommunityProperty
    ? "This state generally starts from a community-property framework, so separate property, marital/community property, appreciation, income, and debt classification should be addressed directly."
    : "This state generally uses an equitable-distribution framework, so property division can depend on classification, fairness factors, disclosure, and judicial review.";

  return {
    name,
    propertySystem,
    prenupContext: `${name} generally permits premarital agreements, but enforceability depends on state-specific requirements such as voluntariness, adequate disclosure, formal execution, and public-policy limits. ${propertyContext}`,
    postnupContext: `${name} may treat marital or postnuptial agreements differently from premarital agreements, so spouses should pay close attention to disclosure, fairness, independent counsel, and the duties owed after marriage.`,
    timing: "Starting early helps reduce challenge risk tied to pressure, rushed review, incomplete disclosure, or last-minute signing.",
    futureAssets:
      "Future inheritances, gifts, appreciation, separate-property income, business growth, and later home purchases should be addressed expressly if protection is a goal.",
    international:
      "Foreign property can raise recognition, enforcement, tax, inheritance, title, and local-law issues beyond the selected state's family-law rules.",
    sourceNotes: stateSourceNotes[code]
  };
}

const stateOverrides = {
  MA: {
    propertySystem: "Equitable distribution",
    prenupContext:
      "Massachusetts generally allows premarital agreements, but enforceability can turn on process, disclosure, voluntariness, and fairness when enforcement is sought.",
    postnupContext:
      "Massachusetts recognizes postnuptial agreements, but they may receive close review because spouses already owe duties to each other.",
    timing: "A rushed agreement close to the wedding can increase process-risk concerns.",
    futureAssets:
      "Future inheritances, gifts, appreciation, and income from separate property should be discussed directly in the agreement if protection is a goal.",
    international:
      "Foreign property can raise recognition, enforcement, tax, inheritance, and local-law issues beyond Massachusetts family law.",
    sourceNotes: stateSourceNotes.MA
  },
  CA: {
    propertySystem: "Community property",
    prenupContext:
      "California is a community-property state and has specific statutory requirements for premarital agreements, including voluntariness and process protections.",
    postnupContext:
      "California spouses owe fiduciary duties to each other, so postmarital agreements require careful disclosure and process.",
    timing:
      "California has specific timing and review protections for premarital agreements, so users should begin early and avoid last-minute signing.",
    futureAssets:
      "Future inheritance, gifts, separate-property appreciation, and business growth should be identified carefully to avoid later disputes over community-property claims.",
    international:
      "Cross-border assets may require California counsel plus counsel in the country where the asset is located.",
    sourceNotes: stateSourceNotes.CA
  },
  NY: {
    propertySystem: "Equitable distribution",
    prenupContext:
      "New York generally allows premarital agreements, with enforceability depending on formal execution, disclosure, voluntariness, and fairness concerns.",
    postnupContext:
      "New York permits marital agreements, but users should treat disclosure, independent counsel, and absence of pressure as especially important.",
    timing: "Last-minute execution may create avoidable challenge risk.",
    futureAssets:
      "Inheritances and gifts are often treated differently from marital property, but commingling, joint titling, and appreciation can complicate that treatment.",
    international:
      "International property may involve enforceability and ownership issues outside New York law.",
    sourceNotes: stateSourceNotes.NY
  }
};

export const stateRules = Object.fromEntries(
  states.map(([code, name]) => [code, { ...buildRule(code, name), ...stateOverrides[code] }])
);
