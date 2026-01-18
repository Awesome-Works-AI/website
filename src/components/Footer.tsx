import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 border-t border-[var(--color-primary)]/20">
      <div className="text-center">
        <p className="text-sm text-[var(--color-text-muted)]">
          © {currentYear} Awesome Works. {t('footer.rights')}.
        </p>
      </div>
    </footer>
  );
}
