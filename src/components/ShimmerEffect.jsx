function ShimmerEffect() {
  return (
    <div className="flex gap-4 flex-wrap justify-center items-center animate-pulse">
      {[...Array(15)].map((_, i) => {
        return <div key={i} className="h-[20rem] w-[20rem] bg-gray-500"></div>;
      })}
    </div>
  );
}

export default ShimmerEffect;
