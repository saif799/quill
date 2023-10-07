import UploadButton from "./UploadButton";

const Dashboard = () => {
  return (
    <main className=" mx-auto max-w-7xl p-2 md:p-10 ">
      <div className=" mt-8 flex flex-col items-startt justify-between gap-4 border-b border-gray-200 sm:flex-row sm:items-center sm:gap-0">
        <h1 className=" mb-3 font-bold text-5xl text-gray-900">My files</h1>

        <UploadButton/>
      </div>
    </main>
  );
};

export default Dashboard;

/*  list all files
 dlete all files
 upload files
 
 */
