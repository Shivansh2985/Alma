import { MoreHorizontal, FileText, Image, Archive, Trash2, Download, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useMemo } from "react";

export const ResourceTable = ({ resources, searchQuery, onDeleteResource }) => {
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'document':
        return <FileText className="h-4 w-4 text-blue-400" />;
      case 'image':
        return <Image className="h-4 w-4 text-green-400" />;
      case 'archive':
        return <Archive className="h-4 w-4 text-orange-400" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const filteredResources = useMemo(() => {
    if (!searchQuery.trim()) {
      return resources;
    }
    const query = searchQuery.toLowerCase();
    return resources.filter(resource => 
      resource.name.toLowerCase().includes(query) ||
      resource.type.toLowerCase().includes(query) ||
      resource.uploadedBy.toLowerCase().includes(query)
    );
  }, [resources, searchQuery]);

  const handleDownload = (resource) => {
    alert(`Downloading ${resource.name}`);
  };

  const handleRename = (resource) => {
    const newName = prompt(`Rename ${resource.name}:`, resource.name);
    if (newName) {
      alert(`File renamed to: ${newName}`);
    }
  };

  return (
  <div className="flex-1 overflow-auto">
      {filteredResources.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchQuery ? 'No resources found matching your search' : 'No resources uploaded yet'}
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-border/50 bg-white">
          <Table className="min-w-full divide-y divide-border/50">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-muted-foreground font-semibold px-6 py-3">Name</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-3">Type</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-3">Uploaded By</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-3">Date</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-3">Size</TableHead>
                <TableHead className="text-muted-foreground font-semibold px-6 py-3">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResources.map((resource, idx) => (
                <TableRow
                  key={resource.id}
                  className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
                >
                  <TableCell className="font-medium px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(resource.fileType)}
                      <span className="text-foreground">{resource.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground px-6 py-4">{resource.type}</TableCell>
                  <TableCell className="text-muted-foreground px-6 py-4">{resource.uploadedBy}</TableCell>
                  <TableCell className="text-muted-foreground px-6 py-4">{resource.date}</TableCell>
                  <TableCell className="text-muted-foreground px-6 py-4">{resource.size}</TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex gap-2 items-center">
                      <button
                        className="p-1 rounded hover:bg-blue-100 transition"
                        title="Download"
                        onClick={() => handleDownload(resource)}
                      >
                        <Download className="h-4 w-4 text-blue-500" />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-green-100 transition"
                        title="Edit"
                        onClick={() => handleRename(resource)}
                      >
                        <Edit className="h-4 w-4 text-green-500" />
                      </button>
                      <button
                        className="p-1 rounded hover:bg-red-100 transition"
                        title="Delete"
                        onClick={() => onDeleteResource(resource.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ResourceTable;
