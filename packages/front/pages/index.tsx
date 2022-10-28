const Index = () => {
  return <div className="h-screen">
    <div className="grid grid-cols-3 h-full">
      <ul className="bg-neutral">
        <li className="flex flex-row transition hover:transition-all hover:bg-neutral-focus active:bg-primary p-4">
          <div className="w-12 h-12 flex justify-center items-center rounded-xl my-auto bg-pink-600">
            <p className="text-white font-bold">P</p>
          </div>
          <div className="ml-4 flex flex-col">
            <p className="text-white font-bold">Pedaret</p>
            <p className="text-sm">Kir mikhay?</p>
          </div>
          <div className="flex flex-col items-end ml-auto">
            <p>8:52 PM</p>
            <div className="badge bg-primary">1</div>
          </div>
        </li>
      </ul>
      <div className="col-span-2">Messages</div>
    </div>
  </div>
};

export default Index;
