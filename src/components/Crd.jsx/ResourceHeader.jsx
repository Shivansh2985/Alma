import { Search, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef } from "react";

const ResourceHeader = ({ searchQuery, onSearchChange, onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileUpload(files);
      event.target.value = '';
    }
  };

  return (
    <div className="flex items-center justify-between p-6 border-b border-border/50">
      <h1 className="text-2xl font-bold text-foreground">Resource Space</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for resources"
            className="pl-10 w-80 resource-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button className="resource-button-primary gap-2" onClick={handleUploadClick}>
          <Upload className="h-4 w-4" />
          Upload File
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          accept="*/*"
        />
      </div>
    </div>
  );
};

export default ResourceHeader;
