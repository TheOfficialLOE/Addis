const Index = () => {
  return <div className="h-screen">
    <div className="grid grid-cols-[min-content_auto] grid-flow-dense h-full">
      <ul className="w-96 bg-neutral p-4">
        <li className="btn justify-start w-full h-20">
          <div className="w-12 h-12 avatar justify-center items-center rounded-xl bg-pink-600">
            <p className="text-white font-bold">J</p>
          </div>
          <div className="ml-4 flex flex-col items-start">
            <p className="text-white font-bold">Jason</p>
            <p className="text-sm mt-2">Jason: What up buddy?</p>
          </div>
          <div className="flex flex-col items-end items-end grow">
            <p>8:52 PM</p>
            <div className="badge badge-primary mt-2">1500</div>
          </div>
        </li>
      </ul>
      <div className="">Messages</div>
    </div>
  </div>
};

export default Index;
