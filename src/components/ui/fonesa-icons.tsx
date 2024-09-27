interface FonesaIconsProps {
  className?: string;
  style?: React.CSSProperties;
}

function LocationMark({ className, style }: FonesaIconsProps) {
  return (
    <svg
      className={className}
      style={style}
      width="23"
      height="29"
      viewBox="0 0 23 29"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.4158 28.2446C21.4519 20.3064 22.7728 17.9887 22.7728 11.8637C22.7728 5.53755 17.7258 0.40918 11.5 0.40918C5.27427 0.40918 0.227295 5.53755 0.227295 11.8637C0.227295 17.9887 1.54817 20.3064 10.5842 28.2446C11.11 28.7065 11.8901 28.7065 12.4158 28.2446ZM11.5 16.1592C13.8347 16.1592 15.7273 14.236 15.7273 11.8637C15.7273 9.4914 13.8347 7.56826 11.5 7.56826C9.16536 7.56826 7.27275 9.4914 7.27275 11.8637C7.27275 14.236 9.16536 16.1592 11.5 16.1592Z"
        fill="currentColor"
      />
    </svg>
  );
}

const FonesaIcons = { LocationMark };
export default FonesaIcons;
