"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Lang = "vi" | "en";
type Copy = Record<Lang, string>;

const contact = {
  phone: "0937461186",
  email: "admin.pomes@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61588823264025",
  address:
    "C365A, đường Bình Nhâm 36, Khu phố Bình Nhâm, Phường Lái Thiêu, TP.HCM.",
};

const company = {
  name: { vi: "Công ty TNHH Pomes", en: "Pomes Co., Ltd." },
  legalName: { vi: "CÔNG TY TNHH POMES", en: "POMES CO., LTD." },
  slogan: {
    vi: "Chi tiết chính xác - Quy trình hiệu quả",
    en: "Precise details - Effective processes",
  },
  history: {
    vi: "Pomes là công ty mới thành lập, tập trung cung cấp các giải pháp kỹ thuật thực tiễn cho doanh nghiệp sản xuất.",
    en: "Pomes is newly established and focuses on practical engineering solutions for manufacturing businesses.",
  },
};

const pptProfile = {
  title: { vi: "Hồ sơ năng lực công ty", en: "Company profile" },
  intro: {
    vi: "Chúng tôi chuyên cung cấp tư vấn các giải pháp cải tiến, thiết kế, chế tạo máy móc, hệ thống tự động và thiết bị công nghiệp cho quý công ty có nhu cầu.",
    en: "We provide consulting for improvement solutions, machine design and fabrication, automation systems and industrial equipment for companies in need.",
  },
  vision: {
    vi: "Đang cập nhật.",
    en: "Updating.",
  },
  mission: {
    vi: "Tư vấn và triển khai giải pháp giúp nâng cao năng suất, giảm nhân công, tăng an toàn, cải thiện chất lượng, tiết kiệm chi phí và thời gian sản xuất.",
    en: "Consult and deliver solutions that improve productivity, reduce labor, enhance safety, improve quality, and save production cost and time.",
  },
  closing: {
    vi: "Chi tiết chính xác - Quy trình hiệu quả",
    en: "Precise details - Effective processes",
  },
};

const navItems = [
  { key: "home", vi: "Trang chủ", en: "Home", href: "/" },
  { key: "about", vi: "Giới thiệu", en: "About", href: "/gioi-thieu" },
  { key: "services", vi: "Dịch vụ", en: "Services", href: "/dich-vu" },
  { key: "products", vi: "Sản phẩm", en: "Products", href: "/san-pham" },
  { key: "contact", vi: "Liên hệ", en: "Contact", href: "/lien-he" },
];

const ui = {
  consult: { vi: "Nhận tư vấn", en: "Get advice" },
  search: { vi: "Tìm kiếm", en: "Search" },
  explore: { vi: "Khám phá giải pháp", en: "Explore solutions" },
  contactConsult: { vi: "Liên hệ tư vấn", en: "Request consultation" },
  callNow: { vi: "Gọi nhanh", en: "Call now" },
  moreAbout: { vi: "Xem thêm về Pomes", en: "More about Pomes" },
  detail: { vi: "Xem chi tiết", en: "View details" },
  quote: { vi: "Yêu cầu báo giá", en: "Request quote" },
  updating: { vi: "Đang cập nhật.", en: "Updating." },
  sample: { vi: "Nội dung mẫu", en: "Sample content" },
  contactPrice: { vi: "Liên hệ để nhận báo giá.", en: "Contact us for a quotation." },
  success: {
    vi: "Cảm ơn bạn đã liên hệ. Pomes sẽ phản hồi trong thời gian sớm nhất.",
    en: "Thank you for contacting Pomes. We will respond as soon as possible.",
  },
};

const homeValues = [
  { vi: "Nâng cao năng suất sản xuất", en: "Increase production productivity", tag: "UP" },
  { vi: "Giảm chi phí nhân công", en: "Reduce labor cost", tag: "LC" },
  { vi: "Cải thiện độ chính xác", en: "Improve precision", tag: "PX" },
  { vi: "Tăng mức độ an toàn", en: "Enhance safety", tag: "SF" },
  { vi: "Rút ngắn thời gian sản xuất", en: "Shorten production time", tag: "TM" },
];

const services = [
  {
    slug: "giai-phap-tu-dong-hoa",
    icon: "AUTO",
    image: "/ppt-assets/automation-robot.png",
    title: { vi: "Giải pháp tự động hóa", en: "Automation solutions" },
    short: {
      vi: "Cải tiến hệ thống, chuyển đổi dây chuyền thủ công sang bán tự động hoặc tự động hoàn toàn.",
      en: "Upgrade manual production lines into semi-automatic or fully automatic systems.",
    },
    points: {
      vi: ["Khảo sát dây chuyền", "Phân tích công đoạn", "Thiết kế hệ thống", "Lập trình điều khiển", "Chế tạo và lắp đặt", "Chạy thử và bàn giao"],
      en: ["Line survey", "Process analysis", "System design", "Control programming", "Fabrication and installation", "Testing and handover"],
    },
    benefits: {
      vi: ["Giảm nhân công", "Tăng năng suất 30-50% theo hồ sơ năng lực", "Cải thiện độ ổn định", "Tăng an toàn lao động", "Giảm sai sót trong sản xuất"],
      en: ["Reduce labor", "Increase productivity by 30-50% according to the company profile", "Improve stability", "Enhance safety", "Reduce production errors"],
    },
  },
  {
    slug: "thiet-ke-che-tao-may",
    icon: "CAD",
    image: "/ppt-assets/profile-design.webp",
    title: { vi: "Thiết kế và chế tạo máy", en: "Machine design and fabrication" },
    short: {
      vi: "Khảo sát, thiết kế 3D, mô phỏng, gia công và chế tạo máy móc theo yêu cầu.",
      en: "Survey, 3D design, simulation, machining and custom machine fabrication.",
    },
    points: {
      vi: ["Thiết kế máy theo yêu cầu", "Thiết kế 2D và 3D", "Mô phỏng hoạt động", "Gia công linh kiện", "Lắp ráp hoàn thiện", "Cải tiến máy hiện có"],
      en: ["Custom machine design", "2D and 3D design", "Operation simulation", "Parts machining", "Complete assembly", "Existing machine improvement"],
    },
    benefits: {
      vi: ["Thiết kế theo thực tế sản xuất", "Dễ vận hành và bảo trì", "Tối ưu chi phí đầu tư"],
      en: ["Designed for real production", "Easy operation and maintenance", "Optimized investment cost"],
    },
  },
  {
    slug: "khuon-mau-co-khi-chinh-xac",
    icon: "CNC",
    image: "/ppt-assets/foam-mold.webp",
    title: { vi: "Khuôn mẫu và cơ khí chính xác", en: "Mold and precision mechanics" },
    short: {
      vi: "Khuôn tạo hình xốp mút cho ngành may mặc/đồ lót và gia công chi tiết máy phức tạp.",
      en: "Foam forming molds for apparel/lingerie and machining for complex machine components.",
    },
    points: {
      vi: ["Khuôn tạo hình xốp mút cho ngành may mặc và đồ lót", "Gia công chi tiết máy", "Thiết kế jig và đồ gá", "Gia công CNC", "Dựng bản vẽ lắp ráp", "Phục hồi chi tiết máy"],
      en: ["Foam forming molds for apparel and lingerie", "Machine part machining", "Jig and fixture design", "CNC machining", "Assembly drawings", "Machine part restoration"],
    },
    benefits: {
      vi: ["Độ chính xác cao", "Độ bóng và độ bền tốt cho khuôn xốp mút", "Tính đồng nhất tốt", "Phù hợp chi tiết phức tạp"],
      en: ["High accuracy", "High surface finish and durability for foam molds", "Strong consistency", "Suitable for complex parts"],
    },
  },
  {
    slug: "quet-3d-thiet-ke-nguoc",
    icon: "3D",
    image: "/ppt-assets/reverse-engineering.webp",
    title: { vi: "Công nghệ quét 3D và thiết kế ngược", en: "3D scanning and reverse engineering" },
    short: {
      vi: "Thiết kế ngược: quét mẫu có sẵn, dựng mô hình 3D và tái tạo chi tiết không còn bản vẽ.",
      en: "Reverse engineering: scan existing samples, build 3D models and recreate parts without drawings.",
    },
    points: {
      vi: ["Quét mẫu vật", "Dựng dữ liệu 3D", "Tái tạo chi tiết không còn bản vẽ", "Kiểm tra sai lệch kích thước", "Cải tiến mẫu mã sản phẩm", "Hỗ trợ R&D"],
      en: ["Object scanning", "3D data reconstruction", "Recreate parts without drawings", "Dimensional deviation checking", "Product design improvement", "R&D support"],
    },
    benefits: {
      vi: ["Rút ngắn thời gian dựng mẫu", "Giảm rủi ro sai kích thước", "Hỗ trợ cải tiến sản phẩm"],
      en: ["Shorten modeling time", "Reduce dimensional risks", "Support product improvement"],
    },
  },
  {
    slug: "bao-tri-sua-chua-may-moc",
    icon: "MRO",
    image: "/ppt-assets/maintenance.webp",
    title: { vi: "Bảo trì và sửa chữa máy móc", en: "Machine maintenance and repair" },
    short: {
      vi: "Đảm bảo sự vận hành liên tục cho dây chuyền sản xuất của bạn.",
      en: "Keep your production line operating continuously.",
    },
    points: {
      vi: ["Bảo trì định kỳ", "Vệ sinh và kiểm tra máy", "Thay thế linh kiện tiêu hao", "Sửa chữa cơ khí", "Sửa chữa hệ thống điện", "Xử lý phần mềm điều khiển", "Nâng cấp linh kiện", "Phục hồi chi tiết máy"],
      en: ["Periodic maintenance", "Cleaning and inspection", "Consumable part replacement", "Mechanical repair", "Electrical repair", "Control software troubleshooting", "Component upgrades", "Part restoration"],
    },
    benefits: {
      vi: ["Giảm dừng máy", "Kéo dài tuổi thọ thiết bị", "Hỗ trợ kỹ thuật nhanh"],
      en: ["Reduce downtime", "Extend equipment life", "Fast technical support"],
    },
  },
  {
    slug: "thiet-bi-cong-nghiep",
    icon: "SUP",
    image: "/ppt-assets/precision-tools.webp",
    title: { vi: "Cung cấp thiết bị công nghiệp", en: "Industrial equipment supply" },
    short: {
      vi: "Cung cấp thiết bị cơ khí, điện, tự động hóa và khí nén từ các thương hiệu uy tín.",
      en: "Supply mechanical, electrical, automation and pneumatic equipment from trusted brands.",
    },
    points: {
      vi: ["Thiết bị cơ khí", "Thiết bị điện", "Thiết bị tự động hóa", "Thiết bị khí nén", "Cảm biến", "Bộ điều khiển", "Biến tần", "PLC", "Xi lanh khí nén", "Van khí", "Linh kiện máy móc"],
      en: ["Mechanical equipment", "Electrical equipment", "Automation equipment", "Pneumatic equipment", "Sensors", "Controllers", "Inverters", "PLC", "Pneumatic cylinders", "Air valves", "Machine components"],
    },
    benefits: {
      vi: ["Nguồn hàng linh hoạt", "Tư vấn đúng ứng dụng", "Hỗ trợ catalogue và tài liệu kỹ thuật"],
      en: ["Flexible sourcing", "Application-fit consulting", "Catalogue and datasheet support"],
    },
  },
];

const products = [
  {
    slug: "may-moc-tu-dong-hoa-mau",
    code: "POMES-SAMPLE-001",
    image: "/ppt-assets/automation-robot.png",
    type: { vi: "Máy móc tự động hóa", en: "Automation machinery" },
    name: { vi: "Máy móc tự động hóa theo yêu cầu", en: "Custom automation machinery" },
    desc: { vi: "Dữ liệu mẫu để quản trị viên thay thế bằng sản phẩm thực tế.", en: "Sample data for administrators to replace with real products." },
    application: { vi: "Nhà máy sản xuất, cải tiến công đoạn lặp lại.", en: "Factories and repetitive process improvement." },
    brand: "POMES",
    status: { vi: "Liên hệ", en: "Contact" },
  },
  {
    slug: "jig-do-ga-mau",
    code: "POMES-SAMPLE-002",
    image: "/ppt-assets/precision-tools.webp",
    type: { vi: "Jig và đồ gá", en: "Jigs and fixtures" },
    name: { vi: "Jig và đồ gá kiểm tra", en: "Inspection jigs and fixtures" },
    desc: { vi: "Dữ liệu mẫu, chưa phải sản phẩm thương mại chính thức.", en: "Sample data, not an official commercial item." },
    application: { vi: "Định vị, kiểm tra và nâng cao độ đồng nhất.", en: "Positioning, inspection and consistency improvement." },
    brand: "POMES",
    status: { vi: "Theo yêu cầu", en: "On request" },
  },
  {
    slug: "khuon-tao-hinh-xop-mut-mau",
    code: "POMES-SAMPLE-003",
    image: "/ppt-assets/foam-mold.webp",
    type: { vi: "Khuôn tạo hình xốp mút", en: "Foam forming molds" },
    name: { vi: "Khuôn tạo hình xốp mút", en: "Foam forming mold" },
    desc: { vi: "Mẫu danh mục cho ngành may mặc và đồ lót.", en: "Sample category for apparel and lingerie applications." },
    application: { vi: "Tạo hình vật liệu xốp mút.", en: "Foam material forming." },
    brand: "POMES",
    status: { vi: "Theo yêu cầu", en: "On request" },
  },
  {
    slug: "linh-kien-khi-nen-mau",
    code: "POMES-SAMPLE-004",
    image: "/ppt-assets/precision-tools.webp",
    type: { vi: "Linh kiện khí nén", en: "Pneumatic components" },
    name: { vi: "Linh kiện khí nén", en: "Pneumatic components" },
    desc: { vi: "Có thể cập nhật thông tin thương hiệu và catalogue sau.", en: "Brand and catalogue data can be updated later." },
    application: { vi: "Hệ thống khí nén, máy tự động.", en: "Pneumatic systems and automated machines." },
    brand: "SMC",
    status: { vi: "Liên hệ", en: "Contact" },
  },
  {
    slug: "thiet-bi-dieu-khien-tu-dong-mau",
    code: "POMES-SAMPLE-005",
    image: "/ppt-assets/profile-design.webp",
    type: { vi: "Thiết bị điều khiển tự động", en: "Automation controllers" },
    name: { vi: "Thiết bị điều khiển tự động", en: "Automation control devices" },
    desc: { vi: "Dữ liệu mẫu cho PLC, biến tần, cảm biến và bộ điều khiển.", en: "Sample data for PLC, inverter, sensors and controllers." },
    application: { vi: "Tủ điện, dây chuyền tự động hóa.", en: "Control panels and automation lines." },
    brand: "Mitsubishi",
    status: { vi: "Liên hệ", en: "Contact" },
  },
  {
    slug: "chi-tiet-co-khi-chinh-xac-mau",
    code: "POMES-SAMPLE-006",
    image: "/ppt-assets/foam-diagram.webp",
    type: { vi: "Chi tiết cơ khí chính xác", en: "Precision mechanical parts" },
    name: { vi: "Chi tiết cơ khí chính xác", en: "Precision machined parts" },
    desc: { vi: "Gia công theo bản vẽ hoặc mẫu thực tế của khách hàng.", en: "Machined from customer drawings or physical samples." },
    application: { vi: "Máy móc, khuôn, jig và thiết bị sản xuất.", en: "Machinery, molds, jigs and production equipment." },
    brand: "POMES",
    status: { vi: "Theo yêu cầu", en: "On request" },
  },
];

const capabilityItems = [
  {
    vi: "Năng lực tư vấn và khảo sát thực địa",
    en: "Consulting and on-site survey capability",
    desc: {
      vi: "Khảo sát hiện trường, ghi nhận thao tác vận hành, điểm nghẽn, rủi ro an toàn và yêu cầu cải tiến trước khi đề xuất giải pháp.",
      en: "On-site survey covering operation steps, bottlenecks, safety risks and improvement requirements before proposing a solution.",
    },
  },
  {
    vi: "Thiết kế 2D, 3D và mô phỏng vận hành",
    en: "2D, 3D design and operation simulation",
    desc: {
      vi: "Dựng mô hình 3D, bản vẽ kỹ thuật và mô phỏng nguyên lý hoạt động để khách hàng dễ hình dung phương án trước khi chế tạo.",
      en: "Create 3D models, technical drawings and operating simulations so customers can review the concept before fabrication.",
    },
  },
  {
    vi: "Gia công cơ khí, lắp ráp máy và hiệu chỉnh",
    en: "Mechanical machining, assembly and tuning",
    desc: {
      vi: "Gia công chi tiết, khuôn, jig, đồ gá và lắp ráp cụm máy theo bản vẽ hoặc mẫu thực tế của khách hàng.",
      en: "Machine parts, molds, jigs and fixtures, then assemble machine modules from drawings or physical samples.",
    },
  },
  {
    vi: "Lập trình điều khiển, bảo trì và sửa chữa",
    en: "Control programming, maintenance and repair",
    desc: {
      vi: "Hỗ trợ hệ thống điện, điều khiển, phần mềm máy, xử lý lỗi vận hành và thay thế linh kiện tiêu hao định kỳ.",
      en: "Support electrical systems, controls, machine software, operation troubleshooting and periodic consumable replacement.",
    },
  },
  {
    vi: "Cung cấp thiết bị công nghiệp phù hợp ứng dụng",
    en: "Application-fit industrial equipment supply",
    desc: {
      vi: "Tư vấn chọn thiết bị cơ khí, điện, tự động hóa và khí nén theo ứng dụng thay vì chỉ bán theo mã hàng.",
      en: "Advise mechanical, electrical, automation and pneumatic equipment by application, not only by item code.",
    },
  },
  {
    vi: "Đồng hành từ khảo sát đến nghiệm thu và bảo trì",
    en: "Support from survey to handover and maintenance",
    desc: {
      vi: "Theo sát quá trình khảo sát, thiết kế, chế tạo, lắp đặt, chạy thử, hướng dẫn vận hành và hỗ trợ sau nghiệm thu.",
      en: "Follow the work from survey, design, fabrication, installation and trial run to operation training and post-handover support.",
    },
  },
];

const processSteps = [
  { code: "Survey", vi: "Khảo sát thực địa, tìm hiểu nhu cầu và tư vấn phương án.", en: "On-site survey, requirement discovery and solution consulting." },
  { code: "Design", vi: "Thiết kế mô hình 3D, bản vẽ kỹ thuật và mô phỏng vận hành.", en: "3D modeling, technical drawings and operation simulation." },
  { code: "Produce", vi: "Gia công CNC, chế tạo linh kiện và lắp ráp tại xưởng.", en: "CNC machining, component fabrication and workshop assembly." },
  { code: "Install", vi: "Lắp đặt tại nhà máy, chạy thử và hiệu chỉnh kỹ thuật.", en: "Factory installation, trial run and technical tuning." },
  { code: "Support", vi: "Nghiệm thu, hướng dẫn vận hành, bảo trì và hỗ trợ kỹ thuật.", en: "Acceptance, operation training, maintenance and technical support." },
];

const newsCategories = [
  "Tin công ty",
  "Tin dự án",
  "Kiến thức tự động hóa",
  "Kiến thức cơ khí",
  "Bảo trì máy móc",
  "Thiết bị công nghiệp",
  "Hoạt động doanh nghiệp",
  "Tin tuyển dụng",
];

const brands = ["MISUMI", "Mitsubishi", "Delta", "SMC", "LS"];

function localized(value: Copy, lang: Lang) {
  return value[lang];
}

function routeKey(pathname: string) {
  const clean = pathname.replace(/\/$/, "") || "/";
  if (clean === "/") return "home";
  if (clean.startsWith("/gioi-thieu")) return "about";
  if (clean.startsWith("/dich-vu/")) return "service-detail";
  if (clean === "/dich-vu") return "services";
  if (clean.startsWith("/san-pham/")) return "product-detail";
  if (clean === "/san-pham") return "products";
  if (clean.startsWith("/nang-luc")) return "about";
  if (clean.startsWith("/quy-trinh")) return "services";
  if (clean.startsWith("/du-an/")) return "not-found";
  if (clean === "/du-an") return "not-found";
  if (clean.startsWith("/tin-tuc/")) return "not-found";
  if (clean === "/tin-tuc") return "not-found";
  if (clean.startsWith("/tuyen-dung")) return "not-found";
  if (clean.startsWith("/lien-he")) return "contact";
  if (clean.startsWith("/admin")) return "admin";
  if (clean.startsWith("/chinh-sach-bao-mat")) return "privacy";
  if (clean.startsWith("/dieu-khoan-su-dung")) return "terms";
  return "not-found";
}

export default function PomesSite() {
  const [lang, setLang] = useState<Lang>("vi");
  const [path, setPath] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [filters, setFilters] = useState({ keyword: "", type: "", brand: "", application: "", status: "", price: "" });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const initialLang = new URLSearchParams(window.location.search).get("lang");
    if (initialLang === "en" || initialLang === "vi") setLang(initialLang);
    setPath(window.location.pathname || "/");
    const onPop = () => setPath(window.location.pathname || "/");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const title = lang === "vi" ? "Công ty TNHH Pomes | Giải pháp cải tiến, chế tạo máy và tự động hóa" : "Pomes Co., Ltd. | Improvement, machine fabrication and automation solutions";
    const desc =
      lang === "vi"
        ? "Công ty TNHH Pomes tư vấn giải pháp cải tiến, thiết kế, chế tạo máy móc, hệ thống tự động và cung cấp thiết bị công nghiệp tại TP.HCM."
        : "Pomes Co., Ltd. provides consulting for improvement solutions, machine design, fabrication, automation systems and industrial equipment in Ho Chi Minh City.";
    document.title = title;
    setMeta("description", desc);
    setMeta("keywords", "Giải pháp tự động hóa, thiết kế chế tạo máy, cải tiến máy móc, gia công cơ khí chính xác, quét 3D công nghiệp, thiết bị công nghiệp, TP.HCM");
    setCanonical(window.location.href);
    setProperty("og:title", title);
    setProperty("og:description", desc);
    setProperty("og:image", `${window.location.origin}/og.png`);
    setProperty("og:type", "website");
  }, [lang, path]);

  const pageKey = routeKey(path);
  const currentService = services.find((item) => path.endsWith(item.slug));
  const currentProduct = products.find((item) => path.endsWith(item.slug));

  const filteredProducts = useMemo(() => {
    const q = filters.keyword.toLowerCase();
    return products.filter((product) => {
      const text = `${product.name.vi} ${product.name.en} ${product.code} ${product.type.vi} ${product.type.en} ${product.brand} ${product.application.vi}`.toLowerCase();
      return (
        (!q || text.includes(q)) &&
        (!filters.type || product.type[lang] === filters.type) &&
        (!filters.brand || product.brand === filters.brand) &&
        (!filters.application || product.application[lang].includes(filters.application)) &&
        (!filters.status || product.status[lang] === filters.status)
      );
    });
  }, [filters, lang]);

  const productPage = filteredProducts.slice((page - 1) * 4, page * 4);
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / 4));

  function navigate(href: string) {
    window.history.pushState({}, "", href);
    setPath(href);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    setToast(ui.success[lang]);
    form.reset();
    window.setTimeout(() => setToast(""), 5200);
  }

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsAuthed(true);
  }

  return (
    <div className="site-shell">
      <Header
        lang={lang}
        setLang={setLang}
        path={path}
        navigate={navigate}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <main>
        {pageKey === "home" && <HomePage lang={lang} navigate={navigate} submitForm={submitForm} />}
        {pageKey === "about" && <AboutPage lang={lang} navigate={navigate} />}
        {pageKey === "services" && <ServicesPage lang={lang} navigate={navigate} />}
        {pageKey === "service-detail" && <ServiceDetail lang={lang} service={currentService} navigate={navigate} />}
        {pageKey === "products" && (
          <ProductsPage
            lang={lang}
            filters={filters}
            setFilters={setFilters}
            products={productPage}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            navigate={navigate}
          />
        )}
        {pageKey === "product-detail" && <ProductDetail lang={lang} product={currentProduct} submitForm={submitForm} />}
        {pageKey === "capabilities" && <CapabilitiesPage lang={lang} />}
        {pageKey === "process" && <ProcessPage lang={lang} />}
        {pageKey === "projects" && <ProjectsPage lang={lang} />}
        {pageKey === "project-detail" && <ProjectDetail lang={lang} />}
        {pageKey === "news" && <NewsPage lang={lang} />}
        {pageKey === "news-detail" && <NewsDetail lang={lang} />}
        {pageKey === "careers" && <CareersPage lang={lang} submitForm={submitForm} />}
        {pageKey === "contact" && <ContactPage lang={lang} submitForm={submitForm} />}
        {pageKey === "admin" && <AdminPage lang={lang} isAuthed={isAuthed} login={login} />}
        {pageKey === "privacy" && <LegalPage lang={lang} type="privacy" />}
        {pageKey === "terms" && <LegalPage lang={lang} type="terms" />}
        {pageKey === "not-found" && <NotFound lang={lang} navigate={navigate} />}
      </main>
      <Footer lang={lang} navigate={navigate} />
      <FloatingButtons />
      {toast && <div className="toast">{toast}</div>}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: company.legalName.vi,
            alternateName: company.name.en,
            url: typeof window !== "undefined" ? window.location.origin : "",
            logo: "/logo.jpg",
            telephone: contact.phone,
            email: contact.email,
            address: contact.address,
          }),
        }}
      />
    </div>
  );
}

function Header({
  lang,
  setLang,
  path,
  navigate,
  menuOpen,
  setMenuOpen,
  searchOpen,
  setSearchOpen,
  searchTerm,
  setSearchTerm,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  path: string;
  navigate: (href: string) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) {
  const results = [...services.map((item) => ({ title: item.title[lang], href: `/dich-vu/${item.slug}` })), ...products.map((item) => ({ title: item.name[lang], href: `/san-pham/${item.slug}` }))].filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <header className="site-header">
      <a className="brand" href="/" onClick={(event) => { event.preventDefault(); navigate("/"); }}>
        <img src="/logo.jpg" alt="POMES logo" />
      </a>
      <button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span />
        <span />
        <span />
      </button>
      <nav className={menuOpen ? "main-nav open" : "main-nav"}>
        {navItems.map((item) => (
          <a
            key={item.key}
            className={path === item.href || (item.href !== "/" && path.startsWith(item.href)) ? "active" : ""}
            href={item.href}
            onClick={(event) => {
              event.preventDefault();
              navigate(item.href);
            }}
          >
            {item[lang]}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button className="btn primary compact" onClick={() => navigate("/lien-he")}>{ui.consult[lang]}</button>
        <button className="lang-toggle" onClick={() => setLang(lang === "vi" ? "en" : "vi")} aria-label="Switch language">
          VI | EN
        </button>
        <button className="icon-button" aria-label={ui.search[lang]} onClick={() => setSearchOpen(!searchOpen)}>
          <span>⌕</span>
        </button>
      </div>
      {searchOpen && (
        <div className="search-panel">
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={ui.search[lang]} />
          {searchTerm && (
            <div className="search-results">
              {results.length ? results.slice(0, 6).map((item) => (
                <button key={item.href} onClick={() => navigate(item.href)}>{item.title}</button>
              )) : <p>{ui.updating[lang]}</p>}
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function HomePage({ lang, navigate, submitForm }: { lang: Lang; navigate: (href: string) => void; submitForm: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content reveal">
          <p className="eyebrow">{company.name.en}</p>
          <h1>{company.name[lang]}</h1>
          <p className="slogan">{company.slogan[lang]}</p>
          <p>{pptProfile.intro[lang]}</p>
          <div className="hero-actions">
            <button className="btn primary" onClick={() => navigate("/dich-vu")}>{ui.explore[lang]}</button>
            <button className="btn light" onClick={() => navigate("/lien-he")}>{ui.contactConsult[lang]}</button>
            <a className="call-link" href={`tel:${contact.phone}`}>{ui.callNow[lang]} {contact.phone}</a>
          </div>
        </div>
      </section>
      <section className="section split">
        <div>
          <p className="eyebrow">{lang === "vi" ? "Giới thiệu" : "About"}</p>
          <h2>{lang === "vi" ? "Tư vấn cải tiến, thiết kế, chế tạo và tự động hóa" : "Improvement consulting, design, fabrication and automation"}</h2>
          <p>{pptProfile.intro[lang]}</p>
          <p>{lang === "vi" ? "Mục tiêu là giúp doanh nghiệp nâng cao năng suất sản xuất, giảm nhân công, nâng cao sự an toàn và cải thiện chất lượng sản phẩm." : "The goal is to help businesses increase production productivity, reduce labor, improve safety and improve product quality."}</p>
          <p>{lang === "vi" ? "Pomes cũng cung cấp thiết bị công nghiệp trong lĩnh vực cơ khí, điện, tự động, khí nén từ MISUMI, Mitsubishi, Delta, SMC, LS và các nhà sản xuất lớn trên thế giới." : "Pomes also supplies mechanical, electrical, automation and pneumatic industrial equipment from MISUMI, Mitsubishi, Delta, SMC, LS and major global manufacturers."}</p>
          <button className="btn secondary" onClick={() => navigate("/gioi-thieu")}>{ui.moreAbout[lang]}</button>
        </div>
        <div className="metal-panel">
          {homeValues.map((item) => (
            <div className="value-row" key={item.tag}>
              <span>{item.tag}</span>
              <strong>{item[lang]}</strong>
            </div>
          ))}
        </div>
      </section>
      <HomePathways lang={lang} navigate={navigate} />
      <QuickContact lang={lang} submitForm={submitForm} />
    </>
  );
}

function HomePathways({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const pathways = [
    {
      href: "/gioi-thieu",
      image: "/ppt-assets/profile-design.webp",
      title: { vi: "Tìm hiểu về Pomes", en: "About Pomes" },
      desc: {
        vi: "Thông tin công ty, định hướng giải pháp và năng lực hiện có.",
        en: "Company information, solution direction and current capabilities.",
      },
    },
    {
      href: "/dich-vu",
      image: "/ppt-assets/automation-robot.png",
      title: { vi: "Cần cải tiến hoặc chế tạo", en: "Improve or fabricate" },
      desc: {
        vi: "Xem các nhóm dịch vụ chính và quy trình triển khai gọn trong một trang.",
        en: "View core services and the implementation workflow on one page.",
      },
    },
    {
      href: "/san-pham",
      image: "/ppt-assets/precision-tools.webp",
      title: { vi: "Cần thiết bị hoặc chi tiết", en: "Find equipment or parts" },
      desc: {
        vi: "Xem catalogue mẫu, bộ lọc sản phẩm và yêu cầu báo giá.",
        en: "Browse the sample catalogue, product filters and quote requests.",
      },
    },
    {
      href: "/lien-he",
      image: "/ppt-assets/workflow.webp",
      title: { vi: "Gửi yêu cầu tư vấn", en: "Send a consultation request" },
      desc: {
        vi: "Liên hệ nhanh qua điện thoại, Zalo, email, Facebook hoặc form.",
        en: "Contact quickly by phone, Zalo, email, Facebook or form.",
      },
    },
  ];

  return (
    <section className="section home-pathways">
      <PageIntro
        title={lang === "vi" ? "Chọn đúng nội dung theo nhu cầu" : "Choose content by need"}
        subtitle={lang === "vi" ? "Trang chủ chỉ tóm tắt hướng đi chính; thông tin chi tiết được đặt ở từng trang riêng để dễ theo dõi." : "The home page keeps the main directions concise; detailed information lives on each dedicated page."}
      />
      <div className="pathway-grid">
        {pathways.map((item) => (
          <article key={item.href} className="pathway-card">
            <img src={item.image} alt={item.title[lang]} loading="lazy" />
            <div>
              <h3>{item.title[lang]}</h3>
              <p>{item.desc[lang]}</p>
              <button onClick={() => navigate(item.href)}>{ui.detail[lang]}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProfileFromDeck({ lang, navigate, compact = false }: { lang: Lang; navigate: (href: string) => void; compact?: boolean }) {
  return (
    <section className={compact ? "section profile-deck compact-profile" : "section profile-deck"}>
      <div className="profile-copy">
        <p className="eyebrow">{lang === "vi" ? "Từ hồ sơ năng lực" : "From company profile"}</p>
        <h2>{pptProfile.title[lang]}</h2>
        <p>{pptProfile.intro[lang]}</p>
        <div className="profile-points">
          <article>
            <span>{lang === "vi" ? "Tầm nhìn" : "Vision"}</span>
            <strong>{pptProfile.vision[lang]}</strong>
          </article>
          <article>
            <span>{lang === "vi" ? "Sứ mệnh" : "Mission"}</span>
            <strong>{pptProfile.mission[lang]}</strong>
          </article>
        </div>
        <blockquote>{pptProfile.closing[lang]}</blockquote>
        <button className="btn secondary" onClick={() => navigate("/dich-vu")}>{lang === "vi" ? "Xem dịch vụ Pomes" : "View Pomes services"}</button>
      </div>
      <div className="profile-visual">
        <img src="/ppt-assets/profile-design.webp" alt={lang === "vi" ? "Kỹ sư thiết kế 3D trong hồ sơ năng lực Pomes" : "3D design engineer from Pomes profile"} loading="lazy" />
      </div>
    </section>
  );
}

function AboutPage({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const core = lang === "vi" ? ["Chính xác", "Hiệu quả", "Sáng tạo", "Trách nhiệm", "Đồng hành", "Cải tiến liên tục"] : ["Precision", "Efficiency", "Creativity", "Responsibility", "Partnership", "Continuous improvement"];
  return (
    <>
      <PageHero lang={lang} title={lang === "vi" ? "Giới thiệu Công ty TNHH Pomes" : "About Pomes Co., Ltd."} subtitle={company.history[lang]} />
      <ProfileFromDeck lang={lang} navigate={navigate} compact />
      <section className="section prose-grid">
        <article>
          <h2>{lang === "vi" ? "Lịch sử hình thành" : "Formation"}</h2>
          <p>{company.history[lang]}</p>
        </article>
        <article>
          <h2>{lang === "vi" ? "Lĩnh vực hoạt động" : "Areas of activity"}</h2>
          <p>{lang === "vi" ? "Tư vấn cải tiến, thiết kế, chế tạo máy móc, hệ thống tự động, cơ khí chính xác, thiết bị cơ khí, điện, tự động và khí nén." : "Improvement consulting, machine design and fabrication, automation systems, precision mechanics, mechanical, electrical, automation and pneumatic equipment."}</p>
        </article>
        <article>
          <h2>{lang === "vi" ? "Năng lực sản xuất" : "Production capability"}</h2>
          <p>{lang === "vi" ? "Pomes đang trong giai đoạn mới thành lập. Các thông tin chi tiết về xưởng, máy móc, công suất sản xuất và hồ sơ năng lực sẽ được cập nhật khi có dữ liệu chính thức." : "Pomes is newly established. Details about workshop, machinery, production capacity and capability documents will be updated when official data is available."}</p>
        </article>
        <article>
          <h2>{lang === "vi" ? "Định hướng giải pháp" : "Solution direction"}</h2>
          <ul className="check-list">
            {(lang === "vi"
              ? ["Nâng cao năng suất sản xuất.", "Giảm nhân công và thao tác thủ công.", "Nâng cao sự an toàn trong vận hành.", "Cải thiện chất lượng sản phẩm.", "Tiết kiệm chi phí và thời gian sản xuất."]
              : ["Increase production productivity.", "Reduce labor and manual operations.", "Improve operational safety.", "Improve product quality.", "Save production cost and time."]
            ).map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
      </section>
      <section className="section core-values">
        <h2>{lang === "vi" ? "Giá trị cốt lõi" : "Core values"}</h2>
        <div className="pill-grid">{core.map((item) => <span key={item}>{item}</span>)}</div>
        <button className="btn primary" onClick={() => navigate("/lien-he")}>{ui.consult[lang]}</button>
      </section>
    </>
  );
}

function ServicesPage({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  return (
    <>
      <PageHero lang={lang} title={lang === "vi" ? "Dịch vụ kỹ thuật" : "Engineering services"} subtitle={lang === "vi" ? "Tự động hóa, thiết kế chế tạo máy, cơ khí chính xác, quét 3D, bảo trì và thiết bị công nghiệp." : "Automation, machine design, precision mechanics, 3D scanning, maintenance and industrial supply."} />
      <ServiceGrid lang={lang} navigate={navigate} title={lang === "vi" ? "Danh mục dịch vụ" : "Service portfolio"} />
      <ProcessTimeline lang={lang} />
    </>
  );
}

function ServiceDetail({ lang, service, navigate }: { lang: Lang; service?: (typeof services)[number]; navigate: (href: string) => void }) {
  if (!service) return <NotFound lang={lang} navigate={navigate} />;
  return (
    <>
      <PageHero lang={lang} title={service.title[lang]} subtitle={service.short[lang]} />
      <section className="section detail-layout">
        <article className="detail-main">
          <div className="detail-image">
            <img src={service.image} alt={service.title[lang]} loading="lazy" />
          </div>
          <h2>{lang === "vi" ? "Phạm vi thực hiện" : "Scope of work"}</h2>
          <ul className="check-list">{service.points[lang].map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <aside className="detail-side">
          <h3>{lang === "vi" ? "Lợi ích" : "Benefits"}</h3>
          {service.benefits[lang].map((item) => <div className="side-row" key={item}>{item}</div>)}
          <button className="btn primary full" onClick={() => navigate("/lien-he")}>{ui.quote[lang]}</button>
        </aside>
      </section>
    </>
  );
}

function ProductsPage({
  lang,
  filters,
  setFilters,
  products: visibleProducts,
  totalPages,
  page,
  setPage,
  navigate,
}: {
  lang: Lang;
  filters: { keyword: string; type: string; brand: string; application: string; status: string; price: string };
  setFilters: (filters: { keyword: string; type: string; brand: string; application: string; status: string; price: string }) => void;
  products: typeof products;
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
  navigate: (href: string) => void;
}) {
  const types = Array.from(new Set(products.map((item) => item.type[lang])));
  const brandOptions = Array.from(new Set(products.map((item) => item.brand)));
  const statusOptions = Array.from(new Set(products.map((item) => item.status[lang])));
  return (
    <>
      <PageHero lang={lang} title={lang === "vi" ? "Sản phẩm và giải pháp" : "Products and solutions"} subtitle={lang === "vi" ? "Danh mục có bộ lọc, dữ liệu mẫu được đánh dấu rõ để quản trị viên cập nhật." : "Filterable catalogue with clearly marked sample data for administrators to update."} />
      <section className="section products-layout">
        <aside className="filters">
          <h2>{lang === "vi" ? "Bộ lọc" : "Filters"}</h2>
          <input placeholder={lang === "vi" ? "Từ khóa tìm kiếm" : "Search keyword"} value={filters.keyword} onChange={(event) => { setPage(1); setFilters({ ...filters, keyword: event.target.value }); }} />
          <select value={filters.type} onChange={(event) => { setPage(1); setFilters({ ...filters, type: event.target.value }); }}>
            <option value="">{lang === "vi" ? "Loại sản phẩm" : "Product type"}</option>
            {types.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={filters.brand} onChange={(event) => { setPage(1); setFilters({ ...filters, brand: event.target.value }); }}>
            <option value="">{lang === "vi" ? "Thương hiệu" : "Brand"}</option>
            {brandOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input placeholder={lang === "vi" ? "Ứng dụng" : "Application"} value={filters.application} onChange={(event) => { setPage(1); setFilters({ ...filters, application: event.target.value }); }} />
          <select value={filters.price} onChange={(event) => setFilters({ ...filters, price: event.target.value })}>
            <option value="">{lang === "vi" ? "Khoảng giá" : "Price range"}</option>
            <option>{ui.contactPrice[lang]}</option>
          </select>
          <select value={filters.status} onChange={(event) => { setPage(1); setFilters({ ...filters, status: event.target.value }); }}>
            <option value="">{lang === "vi" ? "Tình trạng hàng" : "Stock status"}</option>
            {statusOptions.map((item) => <option key={item}>{item}</option>)}
          </select>
        </aside>
        <div>
          <div className="product-grid">
            {visibleProducts.map((product) => <ProductCard key={product.slug} product={product} lang={lang} navigate={navigate} />)}
          </div>
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>{lang === "vi" ? "Trước" : "Prev"}</button>
            <span>{page}/{totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>{lang === "vi" ? "Sau" : "Next"}</button>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductDetail({ lang, product, submitForm }: { lang: Lang; product?: (typeof products)[number]; submitForm: (event: FormEvent<HTMLFormElement>) => void }) {
  if (!product) return <NotFound lang={lang} navigate={() => undefined} />;
  return (
    <>
      <PageHero lang={lang} title={product.name[lang]} subtitle={`${product.code} - ${product.type[lang]}`} />
      <section className="section detail-layout">
        <article className="detail-main product-detail">
          <div className="product-visual large">
            <img src={product.image} alt={product.name[lang]} loading="lazy" />
            <span>{product.type[lang]}</span>
          </div>
          <p className="badge">{ui.sample[lang]}</p>
          <h2>{lang === "vi" ? "Mô tả" : "Description"}</h2>
          <p>{product.desc[lang]}</p>
          <h3>{lang === "vi" ? "Thông số kỹ thuật" : "Technical specifications"}</h3>
          <p>{ui.updating[lang]}</p>
          <h3>{lang === "vi" ? "Ứng dụng" : "Application"}</h3>
          <p>{product.application[lang]}</p>
          <h3>{lang === "vi" ? "Tài liệu kỹ thuật" : "Technical documents"}</h3>
          <p>{ui.updating[lang]}</p>
        </article>
        <aside className="detail-side">
          <h3>{lang === "vi" ? "Thông tin sản phẩm" : "Product information"}</h3>
          <div className="side-row">{lang === "vi" ? "Thương hiệu" : "Brand"}: {product.brand}</div>
          <div className="side-row">{lang === "vi" ? "Giá" : "Price"}: {ui.contactPrice[lang]}</div>
          <button className="btn secondary full">{lang === "vi" ? "Tải catalogue" : "Download catalogue"}</button>
          <a className="btn light full" href={`tel:${contact.phone}`}>{lang === "vi" ? "Liên hệ" : "Contact"}</a>
          <QuickQuoteForm lang={lang} submitForm={submitForm} />
        </aside>
      </section>
    </>
  );
}

function CapabilitiesPage({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero lang={lang} title={lang === "vi" ? "Năng lực công ty" : "Company capabilities"} subtitle={lang === "vi" ? "Tư vấn, khảo sát, thiết kế, chế tạo, lập trình, bảo trì và cung cấp thiết bị công nghiệp." : "Consulting, survey, design, fabrication, programming, maintenance and industrial equipment supply."} />
      <section className="section capability-list">
        {capabilityItems.map((item, index) => (
          <article key={item.vi}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{item[lang]}</h2>
            <p>{item.desc[lang]}</p>
          </article>
        ))}
      </section>
      <section className="section download-band">
        <h2>{lang === "vi" ? "Tài liệu tải xuống" : "Downloads"}</h2>
        <button className="btn secondary">{lang === "vi" ? "Hồ sơ năng lực PDF" : "Capability profile PDF"}</button>
        <button className="btn secondary">{lang === "vi" ? "Catalogue sản phẩm PDF" : "Product catalogue PDF"}</button>
      </section>
    </>
  );
}

function ProcessPage({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero lang={lang} title={lang === "vi" ? "Quy trình làm việc" : "Working process"} subtitle={lang === "vi" ? "Từ khảo sát đến hỗ trợ sau nghiệm thu, quy trình rõ ràng giúp kiểm soát chất lượng và tiến độ." : "From survey to after-handover support, a clear process helps control quality and schedule."} />
      <ProcessTimeline lang={lang} />
    </>
  );
}

function ProjectsPage({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  return (
    <section className={compact ? "section projects compact" : "section projects page-section"}>
      {!compact && <PageIntro title={lang === "vi" ? "Dự án tiêu biểu" : "Featured projects"} subtitle={lang === "vi" ? "Khu vực dự án sẵn sàng cho ảnh trước và sau, hạng mục, kết quả và thông tin thực hiện." : "Project area prepared for before/after images, scope, results and implementation information."} />}
      {compact && <h2>{lang === "vi" ? "Dự án tiêu biểu" : "Featured projects"}</h2>}
      <div className="empty-state">
        <strong>{lang === "vi" ? "Các dự án tiêu biểu của Pomes đang được cập nhật." : "Pomes featured projects are being updated."}</strong>
        <p>{lang === "vi" ? "Không tự tạo tên khách hàng, số liệu hoặc hình ảnh dự án khi chưa có dữ liệu được cung cấp." : "No customer names, figures or project images are invented before verified data is provided."}</p>
      </div>
    </section>
  );
}

function ProjectDetail({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero lang={lang} title={lang === "vi" ? "Chi tiết dự án" : "Project detail"} subtitle={ui.updating[lang]} />
      <section className="section empty-state"><strong>{lang === "vi" ? "Thông tin dự án đang được cập nhật." : "Project information is being updated."}</strong></section>
    </>
  );
}

function NewsPage({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero lang={lang} title={lang === "vi" ? "Tin tức" : "News"} subtitle={lang === "vi" ? "Kiến thức tự động hóa, cơ khí, bảo trì, thiết bị công nghiệp và hoạt động doanh nghiệp." : "Automation, mechanics, maintenance, industrial equipment knowledge and company activities."} />
      <section className="section">
        <div className="category-grid">{newsCategories.map((item) => <span key={item}>{lang === "vi" ? item : translateNews(item)}</span>)}</div>
        <div className="empty-state">
          <strong>{lang === "vi" ? "Bài viết đang được cập nhật." : "Articles are being updated."}</strong>
          <p>{lang === "vi" ? "Mẫu bài viết trong quản trị có trường tiêu đề, ảnh đại diện, ngày đăng, tác giả, mô tả, nội dung, bài liên quan và nút chia sẻ Facebook/Zalo." : "Admin sample posts include title, thumbnail, date, author, excerpt, content, related posts and Facebook/Zalo sharing."}</p>
        </div>
      </section>
    </>
  );
}

function NewsDetail({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero lang={lang} title={lang === "vi" ? "Chi tiết bài viết" : "Article detail"} subtitle={ui.updating[lang]} />
      <section className="section empty-state"><strong>{lang === "vi" ? "Nội dung bài viết đang được cập nhật." : "Article content is being updated."}</strong></section>
    </>
  );
}

function CareersPage({ lang, submitForm }: { lang: Lang; submitForm: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <>
      <PageHero lang={lang} title={lang === "vi" ? "Tuyển dụng" : "Careers"} subtitle={lang === "vi" ? "Cơ hội nghề nghiệp tại Pomes." : "Career opportunities at Pomes."} />
      <section className="section detail-layout">
        <div className="empty-state">
          <strong>{lang === "vi" ? "Hiện tại Pomes chưa có vị trí tuyển dụng. Vui lòng theo dõi website để cập nhật những cơ hội mới." : "Pomes currently has no open positions. Please follow the website for future opportunities."}</strong>
        </div>
        <aside className="detail-side">
          <h3>{lang === "vi" ? "Gửi CV quan tâm" : "Send CV interest"}</h3>
          <ContactForm lang={lang} submitForm={submitForm} compact subject={lang === "vi" ? "Ứng tuyển" : "Career application"} />
        </aside>
      </section>
    </>
  );
}

function ContactPage({ lang, submitForm }: { lang: Lang; submitForm: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <>
      <PageHero lang={lang} title={lang === "vi" ? "Liên hệ Công ty TNHH Pomes" : "Contact Pomes Co., Ltd."} subtitle={lang === "vi" ? "Thông tin liên hệ chính thức và form gửi yêu cầu tư vấn." : "Official contact information and consultation request form."} />
      <section className="section contact-layout">
        <div className="contact-info">
          <h2>{company.name.vi}</h2>
          <p><strong>{lang === "vi" ? "Địa chỉ" : "Address"}:</strong> {contact.address}</p>
          <p><strong>{lang === "vi" ? "Số điện thoại" : "Phone"}:</strong> {contact.phone}</p>
          <p><strong>Zalo:</strong> {contact.phone}</p>
          <p><strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          <p><strong>Facebook:</strong> <a href={contact.facebook}>{contact.facebook}</a></p>
          <div className="map-placeholder">
            <strong>{lang === "vi" ? "Google Maps đang chờ đường dẫn chính thức." : "Google Maps is awaiting the official link."}</strong>
            <p>{contact.address}</p>
            <a className="btn secondary" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}>{lang === "vi" ? "Xem chỉ đường" : "Get directions"}</a>
          </div>
        </div>
        <ContactForm lang={lang} submitForm={submitForm} />
      </section>
    </>
  );
}

function AdminPage({ lang, isAuthed, login }: { lang: Lang; isAuthed: boolean; login: (event: FormEvent<HTMLFormElement>) => void }) {
  const modules = [
    "Sản phẩm",
    "Danh mục sản phẩm",
    "Dịch vụ",
    "Dự án",
    "Tin tức",
    "Tuyển dụng",
    "Form liên hệ",
    "Yêu cầu báo giá",
    "Ảnh, PDF, catalogue",
    "Logo và banner",
    "Thông tin liên hệ",
    "Giờ làm việc",
    "Nội dung VI/EN",
    "Phân quyền cơ bản",
  ];
  return (
    <>
      <PageHero lang={lang} title={lang === "vi" ? "Trang quản trị" : "Administration"} subtitle={lang === "vi" ? "Dashboard mẫu cho quản trị nội dung, dữ liệu song ngữ và tài nguyên website." : "Sample dashboard for content, bilingual data and website asset management."} />
      <section className="section admin-layout">
        {!isAuthed ? (
          <form className="admin-login" onSubmit={login}>
            <h2>{lang === "vi" ? "Đăng nhập quản trị" : "Admin login"}</h2>
            <p>{lang === "vi" ? "Giao diện demo. Khi triển khai thật cần kết nối backend, tài khoản và phân quyền bảo mật." : "Demo interface. Production deployment needs backend authentication and secure roles."}</p>
            <input required placeholder={lang === "vi" ? "Tài khoản" : "Username"} />
            <input required type="password" placeholder={lang === "vi" ? "Mật khẩu" : "Password"} />
            <button className="btn primary full">{lang === "vi" ? "Đăng nhập" : "Login"}</button>
          </form>
        ) : (
          <div className="admin-dashboard">
            <div className="admin-top">
              <h2>{lang === "vi" ? "Bảng điều khiển nội dung" : "Content dashboard"}</h2>
              <button className="btn secondary">{lang === "vi" ? "Tạo nội dung mới" : "Create new content"}</button>
            </div>
            <div className="admin-grid">{modules.map((item) => <article key={item}><span>{ui.sample[lang]}</span><strong>{lang === "vi" ? item : adminTranslate(item)}</strong><p>{lang === "vi" ? "Thêm, sửa, xóa và cập nhật trường tiếng Việt/tiếng Anh." : "Add, edit, delete and update Vietnamese/English fields."}</p></article>)}</div>
          </div>
        )}
      </section>
    </>
  );
}

function LegalPage({ lang, type }: { lang: Lang; type: "privacy" | "terms" }) {
  const isPrivacy = type === "privacy";
  return (
    <>
      <PageHero lang={lang} title={isPrivacy ? (lang === "vi" ? "Chính sách bảo mật" : "Privacy policy") : (lang === "vi" ? "Điều khoản sử dụng" : "Terms of use")} subtitle={lang === "vi" ? "Nội dung có thể được quản trị viên cập nhật theo yêu cầu pháp lý thực tế." : "Content can be updated by administrators according to actual legal requirements."} />
      <section className="section legal">
        <p>{lang === "vi" ? "Pomes thu thập thông tin người dùng chỉ nhằm mục đích phản hồi tư vấn, báo giá và hỗ trợ kỹ thuật. Các điều khoản vận hành website, cookie, phân tích truy cập và biểu mẫu có thể được cập nhật khi tích hợp hệ thống thật." : "Pomes collects user information only to respond to consultation, quotation and technical support requests. Website operation terms, cookies, analytics and form handling can be updated when the production system is integrated."}</p>
      </section>
    </>
  );
}

function NotFound({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  return (
    <section className="section not-found">
      <h1>404</h1>
      <p>{lang === "vi" ? "Trang bạn đang tìm không tồn tại hoặc đang được cập nhật." : "The page you are looking for does not exist or is being updated."}</p>
      <button className="btn primary" onClick={() => navigate("/")}>{lang === "vi" ? "Về trang chủ" : "Back home"}</button>
    </section>
  );
}

function ServiceGrid({ lang, navigate, title }: { lang: Lang; navigate: (href: string) => void; title: string }) {
  return (
    <section className="section">
      <PageIntro title={title} subtitle={lang === "vi" ? "Các nhóm dịch vụ chính của Pomes được thiết kế cho nhu cầu cải tiến và vận hành sản xuất." : "Pomes core service groups are designed for manufacturing improvement and operation needs."} />
      <div className="service-grid">
        {services.map((service, index) => (
          <article className="service-card reveal" key={service.slug}>
            <div className={`service-media tone-${index % 6}`}>
              <img src={service.image} alt={service.title[lang]} loading="lazy" />
              <span>{service.icon}</span>
            </div>
            <h3>{service.title[lang]}</h3>
            <p>{service.short[lang]}</p>
            <button onClick={() => navigate(`/dich-vu/${service.slug}`)}>{ui.detail[lang]}</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductsHighlight({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  return (
    <section className="section light-section">
      <PageIntro title={lang === "vi" ? "Sản phẩm và giải pháp nổi bật" : "Featured products and solutions"} subtitle={lang === "vi" ? "Không hiển thị giá khi chưa có dữ liệu. Quản trị viên có thể cập nhật ảnh, catalogue, tài liệu và thông số sau." : "Prices are hidden until provided. Administrators can update images, catalogues, documents and specifications later."} />
      <div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} lang={lang} navigate={navigate} />)}</div>
    </section>
  );
}

function ProductCard({ product, lang, navigate }: { product: (typeof products)[number]; lang: Lang; navigate: (href: string) => void }) {
  return (
    <article className="product-card">
      <div className="product-visual">
        <img src={product.image} alt={product.name[lang]} loading="lazy" />
        <span>{product.type[lang]}</span>
      </div>
      <div className="product-body">
        <p className="badge">{ui.sample[lang]}</p>
        <h3>{product.name[lang]}</h3>
        <p>{product.desc[lang]}</p>
        <dl>
          <div><dt>{lang === "vi" ? "Ứng dụng" : "Application"}</dt><dd>{product.application[lang]}</dd></div>
          <div><dt>{lang === "vi" ? "Thương hiệu" : "Brand"}</dt><dd>{product.brand}</dd></div>
          <div><dt>{lang === "vi" ? "Giá" : "Price"}</dt><dd>{ui.contactPrice[lang]}</dd></div>
        </dl>
        <button className="btn secondary full" onClick={() => navigate(`/san-pham/${product.slug}`)}>{ui.quote[lang]}</button>
      </div>
    </article>
  );
}

function CapabilitiesBand({ lang }: { lang: Lang }) {
  return (
    <section className="section capability-band">
      <PageIntro title={lang === "vi" ? "Năng lực Pomes" : "Pomes capabilities"} subtitle={lang === "vi" ? "Do công ty mới thành lập, khu vực số liệu được thiết kế để cập nhật sau, không tự tạo số liệu chưa có căn cứ." : "Because the company is newly established, numeric metrics are designed for later updates and no unsupported figures are invented."} />
      <div className="metric-grid">
        {capabilityItems.map((item) => <article key={item.vi}><span>{lang === "vi" ? "Có thể cập nhật số liệu" : "Metrics editable"}</span><strong>{item[lang]}</strong></article>)}
      </div>
    </section>
  );
}

function ProcessTimeline({ lang }: { lang: Lang }) {
  return (
    <section className="section process-section">
      <PageIntro title={lang === "vi" ? "Quy trình làm việc" : "Working process"} subtitle={lang === "vi" ? "5 bước rõ ràng từ khảo sát đến hỗ trợ kỹ thuật." : "Five clear steps from survey to technical support."} />
      <div className="timeline">
        {processSteps.map((step, index) => (
          <article key={step.code}>
            <span>{lang === "vi" ? `Bước ${index + 1}` : `Step ${index + 1}`}</span>
            <h3>{step.code}</h3>
            <p>{step[lang]}</p>
          </article>
        ))}
      </div>
      <div className="workflow-preview">
        <img src="/ppt-assets/workflow.webp" alt={lang === "vi" ? "Quy trình làm việc Pomes từ hồ sơ năng lực" : "Pomes workflow from company profile"} loading="lazy" />
      </div>
    </section>
  );
}

function BrandBand({ lang }: { lang: Lang }) {
  return (
    <section className="section brand-band">
      <h2>{lang === "vi" ? "Thương hiệu thiết bị" : "Equipment brands"}</h2>
      <p>{lang === "vi" ? "Pomes cung cấp các thiết bị và linh kiện công nghiệp đến từ những thương hiệu uy tín trên thế giới." : "Pomes supplies industrial equipment and components from trusted global brands."}</p>
      <div>{brands.map((brand) => <span key={brand}>{brand}</span>)}</div>
    </section>
  );
}

function QuickContact({ lang, submitForm }: { lang: Lang; submitForm: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <section className="section quick-contact">
      <div>
        <p className="eyebrow">{lang === "vi" ? "Tư vấn nhanh" : "Quick consultation"}</p>
        <h2>{lang === "vi" ? "Bạn đang cần cải tiến máy móc hoặc tự động hóa dây chuyền?" : "Do you need machine improvement or line automation?"}</h2>
        <p>{lang === "vi" ? "Hãy mô tả nhu cầu của doanh nghiệp. Đội ngũ Pomes sẽ liên hệ để khảo sát và tư vấn giải pháp phù hợp." : "Describe your company needs. The Pomes team will contact you to survey and recommend a suitable solution."}</p>
      </div>
      <ContactForm lang={lang} submitForm={submitForm} compact />
    </section>
  );
}

function ContactForm({ lang, submitForm, compact = false, subject = "" }: { lang: Lang; submitForm: (event: FormEvent<HTMLFormElement>) => void; compact?: boolean; subject?: string }) {
  return (
    <form className={compact ? "contact-form compact-form" : "contact-form"} onSubmit={submitForm}>
      <input name="website" className="honeypot" tabIndex={-1} autoComplete="off" />
      <input required name="name" placeholder={lang === "vi" ? "Họ và tên" : "Full name"} />
      <input name="company" placeholder={lang === "vi" ? "Tên công ty" : "Company"} />
      <input required name="phone" inputMode="tel" placeholder={lang === "vi" ? "Số điện thoại" : "Phone"} />
      <input name="email" type="email" placeholder="Email" />
      <select required name="service" defaultValue={subject}>
        <option value="">{lang === "vi" ? "Dịch vụ quan tâm" : "Service of interest"}</option>
        {services.map((service) => <option key={service.slug}>{service.title[lang]}</option>)}
        {subject && <option>{subject}</option>}
      </select>
      <textarea required name="message" placeholder={lang === "vi" ? "Nội dung cần tư vấn" : "Consultation details"} />
      <label className="file-field">
        <span>{lang === "vi" ? "Tải tệp bản vẽ hoặc hình ảnh" : "Upload drawing or image"}</span>
        <input name="file" type="file" />
      </label>
      <button className="btn primary full">{lang === "vi" ? "Gửi yêu cầu" : "Send request"}</button>
    </form>
  );
}

function QuickQuoteForm({ lang, submitForm }: { lang: Lang; submitForm: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <form className="quote-form" onSubmit={submitForm}>
      <input name="website" className="honeypot" tabIndex={-1} autoComplete="off" />
      <input required placeholder={lang === "vi" ? "Họ tên" : "Name"} />
      <input required inputMode="tel" placeholder={lang === "vi" ? "Số điện thoại" : "Phone"} />
      <textarea required placeholder={lang === "vi" ? "Nhu cầu báo giá" : "Quotation need"} />
      <button className="btn primary full">{ui.quote[lang]}</button>
    </form>
  );
}

function Footer({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <img src="/logo.jpg" alt="POMES logo" />
          <p>{lang === "vi" ? "Pomes tư vấn giải pháp cải tiến, thiết kế, chế tạo máy móc, hệ thống tự động và cung cấp thiết bị công nghiệp cho doanh nghiệp sản xuất." : "Pomes provides consulting for improvement solutions, machine design, fabrication, automation systems and industrial equipment for manufacturers."}</p>
        </div>
        <div>
          <h3>{lang === "vi" ? "Liên kết nhanh" : "Quick links"}</h3>
          {navItems.filter((item) => item.key !== "capabilities" && item.key !== "process").map((item) => <button key={item.key} onClick={() => navigate(item.href)}>{item[lang]}</button>)}
        </div>
        <div>
          <h3>{lang === "vi" ? "Dịch vụ" : "Services"}</h3>
          {services.map((service) => <button key={service.slug} onClick={() => navigate(`/dich-vu/${service.slug}`)}>{service.title[lang]}</button>)}
        </div>
        <div>
          <h3>{lang === "vi" ? "Liên hệ" : "Contact"}</h3>
          <p>{contact.address}</p>
          <p>Hotline: {contact.phone}</p>
          <p>Email: {contact.email}</p>
          <p>Zalo: {contact.phone}</p>
          <a href={contact.facebook}>{contact.facebook}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Công ty TNHH Pomes. All rights reserved.</span>
        <button onClick={() => navigate("/chinh-sach-bao-mat")}>{lang === "vi" ? "Chính sách bảo mật" : "Privacy"}</button>
        <button onClick={() => navigate("/dieu-khoan-su-dung")}>{lang === "vi" ? "Điều khoản sử dụng" : "Terms"}</button>
      </div>
    </footer>
  );
}

function FloatingButtons() {
  return (
    <div className="floating-actions">
      <a href={`tel:${contact.phone}`}>Call</a>
      <a href={`https://zalo.me/${contact.phone}`}>Zalo</a>
      <a href={contact.facebook}>Facebook</a>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Top</button>
    </div>
  );
}

function PageHero({ lang, title, subtitle }: { lang: Lang; title: string; subtitle: string }) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{company.name.en}</p>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
}

function PageIntro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="section-intro">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function setMeta(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setProperty(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href: string) {
  let tag = document.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

function translateNews(value: string) {
  const map: Record<string, string> = {
    "Tin công ty": "Company news",
    "Tin dự án": "Project news",
    "Kiến thức tự động hóa": "Automation knowledge",
    "Kiến thức cơ khí": "Mechanical knowledge",
    "Bảo trì máy móc": "Machine maintenance",
    "Thiết bị công nghiệp": "Industrial equipment",
    "Hoạt động doanh nghiệp": "Company activities",
    "Tin tuyển dụng": "Recruitment news",
  };
  return map[value] || value;
}

function adminTranslate(value: string) {
  const map: Record<string, string> = {
    "Sản phẩm": "Products",
    "Danh mục sản phẩm": "Product categories",
    "Dịch vụ": "Services",
    "Dự án": "Projects",
    "Tin tức": "News",
    "Tuyển dụng": "Careers",
    "Form liên hệ": "Contact forms",
    "Yêu cầu báo giá": "Quote requests",
    "Ảnh, PDF, catalogue": "Images, PDF, catalogues",
    "Logo và banner": "Logo and banners",
    "Thông tin liên hệ": "Contact information",
    "Giờ làm việc": "Working hours",
    "Nội dung VI/EN": "VI/EN content",
    "Phân quyền cơ bản": "Basic roles",
  };
  return map[value] || value;
}
