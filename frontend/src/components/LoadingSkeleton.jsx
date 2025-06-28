const LoadingSkeleton = () => {
  return (
    <div className='animate-pulse z-[100] w-full space-y-4 p-12 rounded-xl shadow'>
      {/* Avatar Placeholder */}
      <div className='h-12 w-12 rounded-full bg-base-300' />

      {/* Title Placeholder */}
      <div className='h-4 w-3/6 bg-base-300 rounded' />

      {/* Subtitle Placeholder */}
      <div className='h-4 w-1/2 bg-base-300 rounded' />

      {/* Paragraph lines */}
      <div className='space-y-2'>
        <div className='h-3 w-full bg-base-300 rounded' />
        <div className='h-3 w-5/6 bg-base-300 rounded' />
        <div className='h-3 w-4/6 bg-base-300 rounded' />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
