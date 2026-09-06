import {Separator} from "@heroui/react";
import MaintenanceForm from "./MaintenanceForm";
import PricingDeliveryForm from "./PricingDeliveryForm";

function SettingsLayout() {
  return (
    <div className="space-y-8">
      <PricingDeliveryForm />
      <Separator />
      <MaintenanceForm />
    </div>
  );
}

export default SettingsLayout;
