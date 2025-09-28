import { useState } from "react";
import ResourceHeader from "./ResourceHeader";
import ResourceTable from "./ResourceTable";

const sampleData = [
  { id: '1', name: 'Project_Proposal.pdf', type: 'PDF Document', uploadedBy: 'John Smith', date: '2024-01-15', size: '2.4 MB', fileType: 'document' },
  { id: '2', name: 'UI_Mockups.zip', type: 'ZIP Archive', uploadedBy: 'Sarah Wilson', date: '2024-01-14', size: '15.7 MB', fileType: 'archive' },
  { id: '3', name: 'hero_banner.png', type: 'PNG Image', uploadedBy: 'Mike Johnson', date: '2024-01-13', size: '3.2 MB', fileType: 'image' },
  { id: '4', name: 'Meeting_Notes.docx', type: 'Word Document', uploadedBy: 'Emily Davis', date: '2024-01-12', size: '847 KB', fileType: 'document' },
  { id: '5', name: 'data_export.csv', type: 'CSV File', uploadedBy: 'Alex Chen', date: '2024-01-11', size: '1.1 MB', fileType: 'document' },
  { id: '6', name: 'presentation.pptx', type: 'PowerPoint Presentation', uploadedBy: 'Priya Singh', date: '2024-01-10', size: '4.5 MB', fileType: 'document' },
  { id: '7', name: 'logo.svg', type: 'SVG Image', uploadedBy: 'Ravi Kumar', date: '2024-01-09', size: '120 KB', fileType: 'image' },
  { id: '8', name: 'budget.xlsx', type: 'Excel Spreadsheet', uploadedBy: 'Anjali Mehta', date: '2024-01-08', size: '1.8 MB', fileType: 'document' },
  { id: '9', name: 'archive.rar', type: '7-Zip Archive', uploadedBy: 'Vikram Patel', date: '2024-01-07', size: '8.2 MB', fileType: 'archive' },
  { id: '10', name: 'notes.txt', type: 'Text File', uploadedBy: 'Sneha Rao', date: '2024-01-06', size: '24 KB', fileType: 'document' },
  { id: '11', name: 'photo.jpg', type: 'JPEG Image', uploadedBy: 'Amit Shah', date: '2024-01-05', size: '2.1 MB', fileType: 'image' },
  { id: '12', name: 'manual.pdf', type: 'PDF Document', uploadedBy: 'Neha Gupta', date: '2024-01-04', size: '3.7 MB', fileType: 'document' },
  { id: '13', name: 'script.js', type: 'JavaScript File', uploadedBy: 'Rahul Verma', date: '2024-01-03', size: '56 KB', fileType: 'document' },
  { id: '14', name: 'data.json', type: 'JSON File', uploadedBy: 'Kiran Desai', date: '2024-01-02', size: '89 KB', fileType: 'document' },
  { id: '15', name: 'design.ai', type: 'Adobe Illustrator File', uploadedBy: 'Manish Tiwari', date: '2024-01-01', size: '5.6 MB', fileType: 'document' },
  { id: '16', name: 'audio.mp3', type: 'MP3 Audio', uploadedBy: 'Pooja Sinha', date: '2023-12-31', size: '7.2 MB', fileType: 'document' },
  { id: '17', name: 'video.mp4', type: 'MP4 Video', uploadedBy: 'Suresh Yadav', date: '2023-12-30', size: '20.4 MB', fileType: 'document' },
  { id: '18', name: 'backup.tar', type: 'TAR Archive', uploadedBy: 'Deepak Joshi', date: '2023-12-29', size: '12.3 MB', fileType: 'archive' },
  { id: '19', name: 'icon.bmp', type: 'BMP Image', uploadedBy: 'Ritika Jain', date: '2023-12-28', size: '340 KB', fileType: 'image' },
  { id: '20', name: 'readme.md', type: 'Markdown File', uploadedBy: 'Harshita Agarwal', date: '2023-12-27', size: '8 KB', fileType: 'document' },
];

const getFileType = (fileName) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"].includes(extension || '')) {
    return 'image';
  }
  if (["zip", "rar", "7z", "tar", "gz"].includes(extension || '')) {
    return 'archive';
  }
  return 'document';
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileTypeDescription = (fileName) => {
  const extension = fileName.split('.').pop()?.toUpperCase();
  switch (extension) {
    case 'PDF': return 'PDF Document';
    case 'DOC':
    case 'DOCX': return 'Word Document';
    case 'XLS':
    case 'XLSX': return 'Excel Spreadsheet';
    case 'PPT':
    case 'PPTX': return 'PowerPoint Presentation';
    case 'TXT': return 'Text File';
    case 'CSV': return 'CSV File';
    case 'JSON': return 'JSON File';
    case 'XML': return 'XML File';
    case 'ZIP': return 'ZIP Archive';
    case 'RAR': return '7-Zip Archive';
    case 'PNG': return 'PNG Image';
    case 'JPG':
    case 'JPEG': return 'JPEG Image';
    case 'GIF': return 'GIF Image';
    case 'SVG': return 'SVG Image';
    case 'MP4': return 'MP4 Video';
    case 'MP3': return 'MP3 Audio';
    default: return `${extension} File`;
  }
};

const Resource = () => {
  const [resources, setResources] = useState(sampleData);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Filtered resources for search
  const filteredResources = resources.filter(resource => {
    const query = searchQuery.toLowerCase();
    return (
      resource.name.toLowerCase().includes(query) ||
      resource.type.toLowerCase().includes(query) ||
      resource.uploadedBy.toLowerCase().includes(query)
    );
  });
  const totalPages = Math.ceil(filteredResources.length / pageSize);
  const paginatedResources = filteredResources.slice((page - 1) * pageSize, page * pageSize);

  const handleFileUpload = (files) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const newResources = [];
    Array.from(files).forEach((file) => {
      const newResource = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: getFileTypeDescription(file.name),
        uploadedBy: 'Current User',
        date: currentDate,
        size: formatFileSize(file.size),
        fileType: getFileType(file.name)
      };
      newResources.push(newResource);
    });
    setResources(prev => [...newResources, ...prev]);
    setPage(1); // Reset to first page on upload
  };

  const handleDeleteResource = (id) => {
    setResources(prev => prev.filter(resource => resource.id !== id));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col h-screen">
        <ResourceHeader 
          searchQuery={searchQuery}
          onSearchChange={q => { setSearchQuery(q); setPage(1); }}
          onFileUpload={handleFileUpload}
        />
        <div className="flex-1 p-6">
          <div className="bg-card rounded-lg border border-border/50 h-full flex flex-col shadow-soft">
            <ResourceTable 
              resources={paginatedResources}
              searchQuery={searchQuery}
              onDeleteResource={handleDeleteResource}
            />
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4 px-4 pb-2">
              <span className="text-sm text-muted-foreground">
                Showing {filteredResources.length === 0 ? 0 : (page - 1) * pageSize + 1}
                -{Math.min(page * pageSize, filteredResources.length)} of {filteredResources.length}
              </span>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 rounded border border-border/50 bg-white text-sm disabled:opacity-50"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span className="text-sm px-2">Page {page} of {totalPages}</span>
                <button
                  className="px-3 py-1 rounded border border-border/50 bg-white text-sm disabled:opacity-50"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resource;
