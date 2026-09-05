import {Button, Card, Spinner} from "@heroui/react";
import {Edit02Icon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useEffect, useRef, useState} from "react";
import useUpdateMenuItem from "./useUpdateMenuItem";

function MenuItemImage({item, imageUrl: externalImageUrl}) {
  const imageUrl = item?.image_url || externalImageUrl;
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const {mutateUpdateMenuItem, isUpdateMenuItemPending} = useUpdateMenuItem();

  useEffect(() => {
    setPreviewUrl(null);
    setSelectedFile(null);
  }, [imageUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    if (!selectedFile || !item?.id) return;

    mutateUpdateMenuItem(
      {
        menuItemId: item.id,
        updates: {
          image: selectedFile,
          old_image_url: imageUrl,
        },
      },
      {
        onSuccess: () => {
          setSelectedFile(null);
          setPreviewUrl(null);
        },
      },
    );
  };

  const displaySrc = previewUrl || imageUrl;

  return (
    <div className="flex flex-col gap-3 w-fit max-w-sm">
      <Card className="relative p-0 overflow-hidden group border border-border w-fit max-h-[360px]">
        {displaySrc ? (
          <img
            src={displaySrc}
            alt={item?.name_en || "Menu item image"}
            className="max-h-[360px] max-w-full h-auto w-auto object-contain rounded-lg block"
          />
        ) : (
          <div className="w-48 h-48 bg-default-100 flex items-center justify-center text-default-400 text-sm rounded-lg">
            No Image
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {!selectedFile && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
              transition-opacity duration-200 flex flex-col items-center justify-center cursor-pointer text-white gap-2 font-medium text-xs">
            <Button
              isIconOnly
              variant="secondary"
              size="sm"
              className="bg-background/80 backdrop-blur-sm">
              <HugeiconsIcon icon={Edit02Icon} size={16} />
            </Button>
            <span>Change Image</span>
          </div>
        )}
      </Card>

      {selectedFile && (
        <div className="flex items-center gap-2 w-full">
          <Button
            size="sm"
            variant="primary"
            className="flex-1"
            isDisabled={isUpdateMenuItemPending}
            isLoading={isUpdateMenuItemPending}
            onClick={handleSave}>
            {isUpdateMenuItemPending ? "Uploading..." : "Save Image"}
            {isUpdateMenuItemPending && <Spinner size="sm" />}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            isDisabled={isUpdateMenuItemPending}
            onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

export default MenuItemImage;
