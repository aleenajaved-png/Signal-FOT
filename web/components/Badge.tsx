import styles from "./Badge.module.css";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

/** Reusable pill badge — blue background, white label (12px/500). */
export default function Badge({ children, className }: BadgeProps) {
  return (
    <span className={`${styles.badge}${className ? ` ${className}` : ""}`}>
      {children}
    </span>
  );
}
