import {
  Button,
  Drawer,
  Input,
  Label,
  ListBox,
  Select,
  Spinner,
  TextField,
} from "@heroui/react";
import {Edit, LocationIcon, PlusIcon} from "@hugeicons/core-free-icons";
import {HugeiconsIcon} from "@hugeicons/react";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {BranchStatus} from "../../utils/constants";
import useGetLocationUrl from "./UseGetLocationUrl";
import useCreateBranch from "./useCreateBranch";
import useUpdateBranch from "./useUpdateBranch";

const defaultValues = {
  name: "",
  address: "",
  phone: "",
  location: "",
  opening_time: "",
  closing_time: "",
  status: BranchStatus.ACTIVE,
};

function BranchDrawer({branchToEdit = {}}) {
  const isEditSession = Boolean(branchToEdit?.id);
  const editId = branchToEdit?.id;

  const [isOpen, setIsOpen] = useState(false);
  const {getCurrentLocation, isGettingLocation} = useGetLocationUrl();
  const {createBranch, isCreating} = useCreateBranch();
  const {updateBranch, isUpdating} = useUpdateBranch();

  const isWorking = isCreating || isUpdating;

  const editValues = {
    name: branchToEdit?.name || "",
    address: branchToEdit?.address || "",
    phone: branchToEdit?.phone || "",
    location: branchToEdit?.location || "",
    opening_time: branchToEdit?.opening_time || "",
    closing_time: branchToEdit?.closing_time || "",
    status: branchToEdit?.status || BranchStatus.ACTIVE,
  };

  const {handleSubmit, reset, setValue, control} = useForm({
    defaultValues: isEditSession ? editValues : defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      reset(isEditSession ? editValues : defaultValues);
    }
  }, [isOpen, isEditSession]);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      reset(isEditSession ? editValues : defaultValues);
    }
  };

  const handleCurrentLocation = () => {
    getCurrentLocation(undefined, {
      onSuccess: (url) => {
        setValue("location", url, {shouldValidate: true});
      },
    });
  };

  const onSubmit = (data) => {
    if (isEditSession) {
      updateBranch(
        {id: editId, ...data},
        {
          onSuccess: () => {
            handleOpenChange(false);
          },
        },
      );
    } else {
      createBranch(data, {
        onSuccess: () => {
          reset(defaultValues);
          handleOpenChange(false);
        },
      });
    }
  };

  const formId = `branch-form-${isEditSession ? editId : "new"}`;

  return (
    <Drawer isOpen={isOpen} onOpenChange={handleOpenChange}>
      {isEditSession ? (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsOpen(true)}>
          <HugeiconsIcon icon={Edit} />
          Edit
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="!font-semibold"
          onClick={() => setIsOpen(true)}>
          <HugeiconsIcon icon={PlusIcon} />
          Add Branch
        </Button>
      )}

      <Drawer.Backdrop variant="blur">
        <Drawer.Content placement="right">
          <Drawer.Dialog className="w-full max-w-md">
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>
                {isEditSession ? "Edit Branch" : "Add Branch"}
              </Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <p className="text-sm text-default-500">
                {isEditSession
                  ? "Update Branch Info below."
                  : "Fill Branch Info below."}
              </p>

              <div className="pt-6">
                <form
                  id={formId}
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                      <TextField
                        className="w-full space-y-2"
                        name="name"
                        type="text"
                        isRequired>
                        <Label>Name</Label>
                        <Input
                          placeholder="Enter branch name"
                          variant="secondary"
                          autoComplete="off"
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      </TextField>
                    )}
                  />

                  <Controller
                    name="address"
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                      <TextField
                        className="w-full space-y-2"
                        name="address"
                        type="text"
                        isRequired>
                        <Label>Address</Label>
                        <Input
                          placeholder="Enter branch address"
                          variant="secondary"
                          autoComplete="off"
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      </TextField>
                    )}
                  />

                  <Controller
                    name="phone"
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                      <TextField
                        className="w-full space-y-2"
                        name="phone"
                        type="tel"
                        isRequired>
                        <Label>Phone</Label>
                        <Input
                          placeholder="Enter phone number"
                          variant="secondary"
                          autoComplete="off"
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      </TextField>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="opening_time"
                      control={control}
                      rules={{required: true}}
                      render={({field}) => (
                        <TextField
                          className="w-full space-y-2"
                          name="opening_time"
                          type="time"
                          isRequired>
                          <Label>Opening Time</Label>
                          <Input
                            type="time"
                            variant="secondary"
                            autoComplete="off"
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </TextField>
                      )}
                    />

                    <Controller
                      name="closing_time"
                      control={control}
                      rules={{required: true}}
                      render={({field}) => (
                        <TextField
                          className="w-full space-y-2"
                          name="closing_time"
                          type="time"
                          isRequired>
                          <Label>Closing Time</Label>
                          <Input
                            type="time"
                            variant="secondary"
                            autoComplete="off"
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </TextField>
                      )}
                    />
                  </div>

                  <Controller
                    name="location"
                    control={control}
                    rules={{required: true}}
                    render={({field}) => (
                      <TextField
                        className="w-full space-y-2"
                        name="location"
                        isRequired>
                        <Label>Location</Label>
                        <div className="flex items-center gap-2 w-full">
                          <Input
                            placeholder="Enter branch location"
                            variant="secondary"
                            autoComplete="off"
                            className="w-full"
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                          <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            className="w-fit shrink-0"
                            isDisabled={isGettingLocation}
                            onClick={handleCurrentLocation}>
                            <HugeiconsIcon icon={LocationIcon} />
                            {isGettingLocation
                              ? "Locating..."
                              : "Current Location"}
                          </Button>
                        </div>
                      </TextField>
                    )}
                  />

                  <div className="space-y-2">
                    <Controller
                      name="status"
                      control={control}
                      rules={{required: true}}
                      render={({field}) => (
                        <Select
                          variant="secondary"
                          className="w-full"
                          isRequired
                          selectedKey={field.value}
                          onSelectionChange={(key) => field.onChange(key)}>
                          <Label>Status</Label>
                          <Select.Trigger className="w-full">
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover>
                            <ListBox>
                              {Object.entries(BranchStatus).map(
                                ([key, value]) => (
                                  <ListBox.Item
                                    key={value}
                                    id={value}
                                    textValue={value}>
                                    <span className="capitalize">{value}</span>
                                    <ListBox.ItemIndicator />
                                  </ListBox.Item>
                                ),
                              )}
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      )}
                    />
                  </div>
                </form>
              </div>
            </Drawer.Body>
            <Drawer.Footer className="flex items-center justify-between">
              <Button slot="close" variant="secondary" className="w-full">
                Cancel
              </Button>
              <Button
                type="submit"
                form={formId}
                isDisabled={isWorking}
                isLoading={isWorking}
                className="w-full">
                {isEditSession ? "Update Branch" : "Add Branch"}
                {isWorking && <Spinner />}
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

export default BranchDrawer;
