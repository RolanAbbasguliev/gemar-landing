import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  LANGS,
  translations,
  type Dictionary,
  type Lang,
} from "./translations";

const STORAGE_KEY = "gemar-lang";

const CIS = new Set([
  "RU",
  "BY",
  "KZ",
  "KG",
  "UZ",
  "TJ",
  "AM",
  "MD",
  "UA",
  "GE",
  "TM",
]);

function isLang(value: string | null): value is Lang {
  return value === "ru" || value === "en" || value === "az";
}

function fromCountry(code: string): Lang {
  const c = code.toUpperCase();
  if (c === "AZ") return "az";
  if (CIS.has(c)) return "ru";
  return "en";
}

function fromBrowser(): Lang {
  const list = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const item of list) {
    const code = item.toLowerCase();
    if (code.startsWith("az")) return "az";
    if (
      code.startsWith("ru") ||
      code.startsWith("be") ||
      code.startsWith("kk") ||
      code.startsWith("uk") ||
      code.startsWith("ky") ||
      code.startsWith("uz")
    ) {
      return "ru";
    }
    if (code.startsWith("en")) return "en";
  }

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (tz === "Asia/Baku") return "az";
  if (
    tz === "Europe/Moscow" ||
    tz === "Europe/Samara" ||
    tz === "Europe/Kaliningrad" ||
    tz === "Europe/Minsk" ||
    tz === "Europe/Kiev" ||
    tz === "Europe/Kyiv" ||
    tz === "Asia/Yekaterinburg" ||
    tz === "Asia/Almaty" ||
    tz === "Asia/Tashkent"
  ) {
    return "ru";
  }

  return "ru";
}

async function fromRegion(): Promise<Lang | null> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), 2500);
  try {
    const res = await fetch("https://ipwho.is/", { signal: ctrl.signal });
    if (!res.ok) return null;
    const data = (await res.json()) as { country_code?: string; success?: boolean };
    if (data.success === false || !data.country_code) return null;
    return fromCountry(data.country_code);
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

type LanguageContextValue = {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ru";
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
    return fromBrowser();
  });
  const [manual, setManual] = useState(() =>
    isLang(localStorage.getItem(STORAGE_KEY)),
  );

  useEffect(() => {
    if (manual) return;
    let cancelled = false;
    fromRegion().then((detected) => {
      if (!cancelled && detected) setLangState(detected);
    });
    return () => {
      cancelled = true;
    };
  }, [manual]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = translations[lang].metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", translations[lang].metaDescription);
  }, [lang]);

  const setLang = (next: Lang) => {
    setManual(true);
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo(
    () => ({ lang, t: translations[lang], setLang }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export function LanguageSwitch({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLang();
  const muted = light ? "text-[#E8D5B0]/40 hover:text-[#E8D5B0]" : "text-[#7A6040]/40 hover:text-[#8B6B3D]";
  const active = light ? "text-[#C9A96E]" : "text-[#8B6B3D]";

  return (
    <div
      className="flex items-center gap-2 font-sans text-[10px] tracking-[0.22em] uppercase"
      role="group"
      aria-label="Language"
    >
      {LANGS.map((item, i) => (
        <span key={item.id} className="flex items-center gap-2">
          {i > 0 && (
            <span className={light ? "text-[#C9A96E]/25" : "text-[#C9A96E]/40"}>·</span>
          )}
          <button
            type="button"
            onClick={() => setLang(item.id)}
            className={`transition-colors duration-300 ${lang === item.id ? active : muted}`}
            aria-pressed={lang === item.id}
          >
            {item.label}
          </button>
        </span>
      ))}
    </div>
  );
}
