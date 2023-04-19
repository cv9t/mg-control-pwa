import DeviceModel, { DeviceData } from "@/models/device.model";

class DeviceService {
  public async findDeviceByActivateCode(activateCode: string) {
    return DeviceModel.findOne({ activateCode });
  }

  public async updateDevice(id: string, data: Partial<DeviceData>) {
    const device = await DeviceModel.findById(id);
    if (!device) {
      return null;
    }
    Object.assign(device, data);
    return device.save();
  }
}

const deviceService = new DeviceService();

export default deviceService;
