function ShimmerEffect() {
  return (
    <div className="grid sm:grid-cols-3 gap-4 justify-center items-center animate-pulse">
      {[...Array(15)].map((_, i) => {
        return <div key={i} className="h-[20rem] w-[20rem] bg-gray-500"></div>;
      })}
    </div>
  );
}

export default ShimmerEffect;
