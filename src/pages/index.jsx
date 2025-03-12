export default function Home() {
  const handleClick = () => {
    const firstWord = document.getElementById("firstWord");
    const secondWord = document.getElementById("secondWord");

    // The first word fades out in 0.7 seconds
    firstWord.style.transition = "opacity 0.7s ease";
    firstWord.style.opacity = "0";

    // The second word fades out after 0.6 seconds
    setTimeout(() => {
      secondWord.style.transition = "opacity 0.6s ease";
      secondWord.style.opacity = "0";
    }, 600);

    // Redirect to the /main page after 0.9 seconds
    setTimeout(() => {
      window.location.href = "/main";
    }, 900);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background image, blurred */}
      <div
        style={{
          backgroundImage: "url('/blockchain.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(3px)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      ></div>

      {/* Button with running border */}
      <button
        id="startButton"
        onClick={handleClick}
        className="animated-button"
        style={{
          padding: "1rem 2rem",
          fontSize: "4.125rem",
          fontFamily: "'PolySans', 'Helvetica', sans-serif",
          backgroundColor: "#FD6F4D", // Orange button background
          color: "#FFFFFF", // White text color
          border: "none",
          borderRadius: "1.5rem",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          overflow: "hidden",
          zIndex: 1,
          transition: "transform 0.7s ease-in-out, box-shadow 0.3s ease",
          boxShadow: "0 4px 15px rgba(253, 111, 77, 0.4)", // Shadow with an orange tint
        }}
      >
        {/* Elements for the running border */}
        <span className="border border-left"></span>
        <span className="border border-top"></span>
        <span className="border border-right"></span>
        <span className="border border-bottom"></span>

        {/* Container with button text */}
        <span id="buttonText">
          <span id="firstWord" style={{ transition: "opacity 1s ease" }}>
            PUSH
          </span>{" "}
          <span id="secondWord" style={{ transition: "opacity 1s ease" }}>
            TO START
          </span>
        </span>
      </button>

      {/* Inline styles */}
      <style jsx>{`
        .animated-button {
          position: relative;
        }
        /* Element for the left edge */
        .animated-button .border-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 8px;
          height: 100%;
          background: linear-gradient(
            to top,
            #ffffff,
            #ffb199
          ); /* White to light orange */
          animation: animateLeft 2s linear infinite;
          animation-delay: 0s;
        }
        @keyframes animateLeft {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
        /* Element for the top edge */
        .animated-button .border-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(to right, #ffffff, #ffb199);
          animation: animateTop 2s linear infinite;
          animation-delay: 0.5s;
        }
        @keyframes animateTop {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        /* Element for the right edge */
        .animated-button .border-right {
          position: absolute;
          top: 0;
          right: 0;
          width: 8px;
          height: 100%;
          background: linear-gradient(to bottom, #ffffff, #ffb199);
          animation: animateRight 2s linear infinite;
          animation-delay: 1s;
        }
        @keyframes animateRight {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        /* Element for the bottom edge */
        .animated-button .border-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(to left, #ffffff, #ffb199);
          animation: animateBottom 2s linear infinite;
          animation-delay: 1.5s;
        }
        @keyframes animateBottom {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        /* Hover effect: scaling and glowing */
        .animated-button:hover {
          transform: scale(1.25);
          box-shadow: 0 0 20px rgba(253, 111, 77, 0.7); /* Enhanced orange glow */
        }
        @media (max-width: 768px) {
          .animated-button {
            font-size: 1.75rem;
            padding: 0.75rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
