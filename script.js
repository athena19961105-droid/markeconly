// ===== Language Data =====
const translations = {
  en: {
    "nav.insights": "Insights",
    "nav.tools": "Tools",
    "nav.about": "About",
    "nav.contact": "Contact",
    "hero.title": "Clear Insights on<br />Marketing & Economics",
    "hero.subtitle": "Practical strategies, real-world cases, and useful tools — explained simply for professionals and learners worldwide.",
    "hero.cta1": "Explore Insights",
    "hero.cta2": "Try Free Tools",
    "insights.title": "Latest Insights",
    "insights.desc": "Short, actionable articles on marketing strategy and economic trends.",
    "insights.viewAll": "View all insights →",
    "articles.pageTitle": "All Insights",
    "articles.pageDesc": "Practical articles on marketing strategy and economic trends.",
    "article.back": "← Back to Insights",
    "card1.title": "How to Calculate Real Marketing ROI in 2026",
    "card1.desc": "Most teams still use outdated metrics. Here’s a simple framework that actually shows profit contribution.",
    "card2.title": "Why Interest Rates Still Matter for Small Businesses",
    "card2.desc": "A clear explanation of how monetary policy affects pricing, inventory, and cash flow decisions.",
    "card3.title": "Cross-Border Marketing: What Actually Works in 2026",
    "card3.desc": "Lessons from brands that successfully expanded into new markets without wasting budget.",
    "card.read": "Read more →",
    "tools.title": "Free Business Tools",
    "tools.desc": "Simple calculators to help you make better decisions. No signup required.",
    "tool1.title": "Marketing ROI Calculator",
    "tool1.desc": "Estimate return on your marketing spend in seconds.",
    "tool1.revenue": "Revenue from campaign ($)",
    "tool1.cost": "Marketing cost ($)",
    "tool1.btn": "Calculate ROI",
    "tool2.title": "Break-even Calculator",
    "tool2.desc": "Find out how many units you need to sell to cover costs.",
    "tool2.fixed": "Fixed costs ($)",
    "tool2.price": "Price per unit ($)",
    "tool2.variable": "Variable cost per unit ($)",
    "tool2.btn": "Calculate",
    "about.title": "About MarkEconly",
    "about.p1": "MarkEconly was created to bridge the gap between academic knowledge and real-world business decisions. We focus on clear, practical explanations of marketing strategies and economic concepts.",
    "about.p2": "Whether you are a marketer, entrepreneur, student, or simply curious about how markets work, our goal is to make complex ideas easy to understand and apply.",
    "about.stat1": "Bilingual Content",
    "about.stat2": "Tools & Articles",
    "about.stat3": "Real-world Focus",
    "ad.label": "Advertisement",
    "footer.desc": "Clear insights on marketing and economics for a global audience.",
    "footer.contact": "Questions or suggestions?"
  },
  zh: {
    "nav.insights": "洞察文章",
    "nav.tools": "实用工具",
    "nav.about": "关于我们",
    "nav.contact": "联系",
    "hero.title": "清晰解读<br />营销与经济",
    "hero.subtitle": "实用策略、真实案例与免费工具——用简单语言讲清楚，帮助全球职场人与学习者做更好决策。",
    "hero.cta1": "浏览洞察",
    "hero.cta2": "试用工具",
    "insights.title": "最新洞察",
    "insights.desc": "短小精悍、可落地的营销策略与经济趋势解读。",
    "insights.viewAll": "查看全部洞察 →",
    "articles.pageTitle": "全部洞察文章",
    "articles.pageDesc": "关于营销策略与经济趋势的实用文章。",
    "article.back": "← 返回文章列表",
    "card1.title": "2026年如何正确计算营销ROI",
    "card1.desc": "很多团队还在用过时指标。这里有一个能真正反映利润贡献的简单框架。",
    "card2.title": "为什么利率对小企业依然重要",
    "card2.desc": "用通俗语言解释货币政策如何影响定价、库存和现金流决策。",
    "card3.title": "跨境营销：2026年真正有效的方法",
    "card3.desc": "从成功拓展新市场的品牌中总结出的经验，帮你避免预算浪费。",
    "card.read": "阅读全文 →",
    "tools.title": "免费商业工具",
    "tools.desc": "帮助你快速做决策的简单计算器，无需注册。",
    "tool1.title": "营销ROI计算器",
    "tool1.desc": "几秒钟估算你的营销投入回报。",
    "tool1.revenue": "活动带来的收入（元）",
    "tool1.cost": "营销成本（元）",
    "tool1.btn": "计算ROI",
    "tool2.title": "盈亏平衡计算器",
    "tool2.desc": "算出需要卖出多少件产品才能覆盖成本。",
    "tool2.fixed": "固定成本（元）",
    "tool2.price": "单价（元）",
    "tool2.variable": "单位变动成本（元）",
    "tool2.btn": "开始计算",
    "about.title": "关于 MarkEconly",
    "about.p1": "MarkEconly 的目标是连接学术知识与真实商业决策。我们专注于用清晰、实用的方式解读营销策略与经济概念。",
    "about.p2": "无论你是营销人、创业者、学生，还是单纯对市场运作好奇，我们都希望把复杂的事情讲简单，让你能真正用起来。",
    "about.stat1": "中英双语内容",
    "about.stat2": "工具与文章",
    "about.stat3": "聚焦实际应用",
    "ad.label": "广告位",
    "footer.desc": "面向全球用户的营销与经济清晰洞察。",
    "footer.contact": "有问题或建议？"
  }
};

let currentLang = "en";

// ===== Language Toggle =====
const langBtn = document.getElementById("lang-toggle");

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  langBtn.textContent = lang === "en" ? "中文" : "EN";
}

langBtn.addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "zh" : "en");
});

// ===== Calculators =====
function calcROI() {
  const revenue = parseFloat(document.getElementById("roi-revenue").value);
  const cost = parseFloat(document.getElementById("roi-cost").value);
  const resultEl = document.getElementById("roi-result");

  if (isNaN(revenue) || isNaN(cost) || cost === 0) {
    resultEl.textContent = currentLang === "en" ? "Please enter valid numbers" : "请输入有效数字";
    resultEl.classList.add("show");
    return;
  }

  const roi = ((revenue - cost) / cost) * 100;
  const sign = roi >= 0 ? "+" : "";
  resultEl.textContent = currentLang === "en"
    ? `ROI: ${sign}${roi.toFixed(1)}%`
    : `投资回报率：${sign}${roi.toFixed(1)}%`;
  resultEl.classList.add("show");
}

function calcBreakEven() {
  const fixed = parseFloat(document.getElementById("be-fixed").value);
  const price = parseFloat(document.getElementById("be-price").value);
  const variable = parseFloat(document.getElementById("be-variable").value);
  const resultEl = document.getElementById("be-result");

  if (isNaN(fixed) || isNaN(price) || isNaN(variable) || price <= variable) {
    resultEl.textContent = currentLang === "en"
      ? "Please enter valid numbers (price must be higher than variable cost)"
      : "请输入有效数字（单价需高于单位变动成本）";
    resultEl.classList.add("show");
    return;
  }

  const units = Math.ceil(fixed / (price - variable));
  resultEl.textContent = currentLang === "en"
    ? `Break-even: ${units} units`
    : `盈亏平衡点：${units} 件`;
  resultEl.classList.add("show");
}

// ===== Mobile Menu (simple) =====
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
    navLinks.style.flexDirection = "column";
    navLinks.style.position = "absolute";
    navLinks.style.top = "64px";
    navLinks.style.left = "0";
    navLinks.style.right = "0";
    navLinks.style.background = "#fff";
    navLinks.style.padding = "20px";
    navLinks.style.borderBottom = "1px solid #e5e7eb";
    navLinks.style.gap = "16px";
  }
});
