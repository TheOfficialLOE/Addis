const Index = () => {
  return <div className="h-screen">
    <div className="grid grid-cols-[min-content_auto] grid-flow-dense h-full">
      <ul className="w-96 bg-neutral">
        <li className="flex flex-row hover:transition-all hover:bg-neutral-focus p-4">
          <div className="w-12 h-12 flex justify-center items-center rounded-xl my-auto bg-pink-600">
            <p className="text-white font-bold">J</p>
          </div>
          <div className="ml-4 flex flex-col">
            <p className="text-white font-bold">Jason</p>
            <p className="text-sm">Jason: What up buddy?</p>
          </div>
          <div className="flex flex-col items-end ml-auto">
            <p>8:52 PM</p>
            <div className="badge bg-primary">1</div>
          </div>
        </li>
      </ul>
      <div className="">Messages</div>
    </div>
  </div>
};

export default Index;
