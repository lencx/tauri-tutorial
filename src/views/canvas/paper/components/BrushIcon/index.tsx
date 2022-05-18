const BrushIcon = () => {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        className="omb-button-light-body"
        fill="#d6dadc"
        d="M12.78,7.66,10.35,5.22,4,11.56V14H6.44Zm2.09-2.1a.42.42,0,0,0,0-.6L13,3.13a.42.42,0,0,0-.6,0L11.29,4.28l2.44,2.44Z"
      />
      <polygon
        fill="var(--omb-brush-color)"
        className="omb-button-stroke-color"
        points="17 13 17 17 3 17 17 13"
      />
      <path
        fill="#00000015"
        className="omb-button-stroke-outline"
        d="M3,17L17,13L17,16L16,16L16,14.34L10.18,16L17,16L17,17z"
      />
      <path
        fill="#b2b4b8"
        className="omb-button-dark-body"
        d="M12.78,7.66,11.56,6.44,4,14H6.44Zm2.09-2.1a.42.42,0,0,0,0-.6L14,4,12.51,5.49l1.22,1.22Z"
      />
    </svg>
  );
};

export default BrushIcon;
