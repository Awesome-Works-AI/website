import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      style={{
        minHeight: "auto",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
      className="relative py-16 lg:py-0"
    >
      <div
        style={{
          maxWidth: "80rem",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          width: "100%",
        }}
      >
        {/* Founder Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-32 lg:mb-48">
          {/* Left side - Photos */}
          <div className="relative mb-8 lg:mb-0 order-2 lg:order-1 flex justify-center">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-lg mx-auto">
              <div
                style={{
                  position: "relative",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                }}
              >
                <img
                  src="/rlazicki_pic_2.jpg"
                  alt="Rafał - founder"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  marginTop: "2rem",
                }}
              >
                <img
                  src="/rlazicki_pic_1.jpg"
                  alt="Rafał - AI consultant"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 15%",
                    transform: "scale(1.2)",
                  }}
                />
              </div>
            </div>
          </div>
          {/* Right side - Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              {t("about.heading")}
            </h2>
            {/* Claim/gradient */}
            <div className="mb-6">{/* Claim removed as requested */}</div>
            {/* About text */}
            <div className="mb-8">
              <p className="text-xl text-white font-medium mb-3 leading-snug">
                {t("about.intro")}
              </p>
              <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
                {t("about.experience")}{" "}
                <span className="gradient-text">Generative AI</span>.<br />
                {t("about.description")}
              </p>
            </div>
            {/* Signature */}
            <div className="text-center lg:text-left pr-4 sm:pr-0">
              <span
                style={{
                  color: "var(--color-text-muted)",
                  fontStyle: "italic",
                  fontSize: "1.1rem",
                }}
              >
                ~ Rafał Łazicki
              </span>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ marginTop: "4rem" }}
        >
          {/* Tymoteusz */}
          <div className="text-center flex flex-col items-center">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm mx-auto mb-4">
              <div
                style={{
                  position: "relative",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                }}
              >
                <img
                  src="/ttymendorf_pic_2.jpg"
                  alt="Tymoteusz - 1"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  marginTop: "1.5rem",
                }}
              >
                <img
                  src="/ttymendorf_pic_1.jpg"
                  alt="Tymoteusz - 2"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 15%",
                  }}
                />
              </div>
            </div>
            <h4 className="text-xl font-bold mb-2 mt-4">
              {t("about.employees.0.name")}
            </h4>
            <p className="text-base text-[var(--color-text-muted)] mb-2">
              {t("about.employees.0.role")}
            </p>
            <p className="text-base text-white">
              {t("about.employees.0.description")}
            </p>
          </div>

          {/* Filip */}
          <div className="text-center flex flex-col items-center">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm mx-auto mb-4">
              <div
                style={{
                  position: "relative",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                }}
              >
                <img
                  src="/fkarpinski_pic_1.jpg"
                  alt="Filip - 1"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  position: "relative",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  marginTop: "1.5rem",
                  backgroundColor: "var(--color-bg-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/fkarpinski_pic_2.jpg"
                  alt="Filip - 2"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 15%",
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector(".fallback")) {
                      const fallback = document.createElement("span");
                      fallback.className = "fallback";
                      fallback.style.color = "var(--color-text-muted)";
                      fallback.style.fontSize = "0.875rem";
                      fallback.textContent = "Dodaj: /fkarpinski_pic_2.jpg";
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
            </div>
            <h4 className="text-xl font-bold mb-2 mt-4">
              {t("about.employees.1.name")}
            </h4>
            <p className="text-base text-[var(--color-text-muted)] mb-2">
              {t("about.employees.1.role")}
            </p>
            <p className="text-base text-white">
              {t("about.employees.1.description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
