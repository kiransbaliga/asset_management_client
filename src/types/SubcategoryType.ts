interface SubcategoryType {
  id?: number;
  name: string;
  categoryId: number;
  count?: number;
  perishable?: boolean;
}

export default SubcategoryType;
