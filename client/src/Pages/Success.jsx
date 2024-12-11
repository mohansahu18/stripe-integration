const Success = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "10px 30px",
          fontSize: "30px",
        }}
      >
        <h3 style={{ color: "green" }}>Thank You For Your Purchase</h3>
      </span>
    </div>
  );
};

export default Success;
