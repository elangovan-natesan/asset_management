import Dropdown from '../Shared/Dropdown';
import FileUpload from '../Shared/FileUpload';
import BarcodeScanner from '../Shared/BarcodeScanner';
import './AssetForm.css';

const AssetForm = () => {
  const dispatch = useDispatch();
  const [assetData, setAssetData] = useState({
    name: '',
    type: '',
    location: '',
    condition: '',
    purchaseDate: '',
    barcode: '',
    qrCode: '',
    documents: [],
    images: [],
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssetData({ ...assetData, [name]: value });
  };

  const handleFileUpload = (files, type) => {
    setAssetData({ ...assetData, [type]: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAsset(assetData));
  };

  return (
    <form className="asset-form" onSubmit={handleSubmit}>
      <InputField name="name" label="Asset Name" value={assetData.name} onChange={handleChange} />
      <InputField name="type" label="Asset Type" value={assetData.type} onChange={handleChange} />
      <InputField name="location" label="Location" value={assetData.location} onChange={handleChange} />
      <InputField name="condition" label="Condition" value={assetData.condition} onChange={handleChange} />
      <InputField name="purchaseDate" label="Purchase Date" type="date" value={assetData.purchaseDate} onChange={handleChange} />
      <BarcodeScanner onScan={(code) => setAssetData({ ...assetData, barcode: code })} />
      <FileUpload label="Upload Documents" onUpload={(files) => handleFileUpload(files, 'documents')} />
      <FileUpload label="Upload Images" onUpload={(files) => handleFileUpload(files, 'images')} />
      <Dropdown name="category" label="Category" options={['Medical Equipment', 'Facility Infrastructure', 'IT Equipment']} value={assetData.category} onChange={handleChange} />
      <button type="submit">Register Asset</button>
    </form>
  );
