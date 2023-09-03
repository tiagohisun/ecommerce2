import { DocumentDownloadIcon, PlayIcon } from '@heroicons/react/outline';

const files = [
  {
    id: 1,
    title: 'X-ray Unit Installation Guide',
    fileType: 'PDF',
    url: '/downloads/installation_guide.pdf',
  },
  {
    id: 2,
    title: 'X-ray Unit Maintenance Manual',
    fileType: 'PDF',
    url: '/downloads/maintenance_manual.pdf',
  },
];

const tutorials = [
  {
    id: 1,
    title: 'How to Set Up Your X-ray Unit',
    thumbnail: '/images/tutorial1_thumbnail.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=example1',
  },
  {
    id: 2,
    title: 'Performing Routine Maintenance on Your X-ray Unit',
    thumbnail: '/images/tutorial2_thumbnail.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=example2',
  },
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative sm:max-w-xl mx-auto text-center">
        <span className="text-2xl font-light">Dental04 Resources</span>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Downloadable Files</h2>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {files.map((file) => (
              <li key={file.id} className="bg-white shadow-md sm:rounded-lg text-left p-6">
                <DocumentDownloadIcon className="h-6 w-6 text-indigo-400 mb-4" />
                <a
                  href={file.url}
                  download
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  {file.title} ({file.fileType})
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Video Tutorials</h2>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {tutorials.map((tutorial) => (
              <li key={tutorial.id} className="bg-white shadow-md sm:rounded-lg text-left p-6">
                <img
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  className="w-full h-48 object-cover mb-4"
                />
                <div className="flex items-center">
                  <PlayIcon className="h-6 w-6 text-indigo-400" />
                  <a
                    href={tutorial.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    {tutorial.title}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resources;
