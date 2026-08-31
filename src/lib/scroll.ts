/**
 * Smoothly scrolls to a target section by element ID, accounting for fixed header height offset.
 * @param sectionId The target element ID (with or without leading '#')
 * @param offset Header offset height in pixels (default: 80px)
 */
export function scrollToSection(sectionId: string, offset = 80): void {
  const targetId = sectionId.startsWith("#") ? sectionId.substring(1) : sectionId;
  const element = document.getElementById(targetId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}
