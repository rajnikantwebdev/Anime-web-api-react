function ShimmerEffect() {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {[...Array(15)].map((_, i) => {
        return <div key={i} className="h-[20rem] w-[20rem] bg-gray-300"></div>;
      })}
    </div>
  );
}

export default ShimmerEffect;
