import { useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ChefHat, X, Trash2 } from "lucide-react";
import { useRecipes, RecipeIngredient } from "@/contexts/RecipeContext";
import { useInventory } from "@/contexts/InventoryContext";


const AdminRecipes = () => {
  const { recipes, addRecipe } = useRecipes();
  const { getAvailableInventoryItems } = useInventory();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    category: "",
    status: "active" as "active" | "inactive",
    ingredients: [] as RecipeIngredient[]
  });

  const availableIngredients = getAvailableInventoryItems();

  const addIngredient = () => {
    const newIngredient: RecipeIngredient = {
      id: Date.now().toString(),
      ingredientId: "",
      ingredientName: "",
      amount: 0,
      unit: "g"
    };
    setNewRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }));
  };

  const removeIngredient = (ingredientId: string) => {
    setNewRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.id !== ingredientId)
    }));
  };


  const handleIngredientSelect = (ingredientId: string, selectedIngredientId: string) => {
    const selectedIngredient = availableIngredients.find(ing => ing.id.toString() === selectedIngredientId);
    
    if (selectedIngredient) {
      setNewRecipe(prev => ({
        ...prev,
        ingredients: prev.ingredients.map(ing => 
          ing.id === ingredientId 
            ? { 
                ...ing, 
                ingredientId: selectedIngredientId,
                ingredientName: selectedIngredient.name,
                unit: selectedIngredient.unit
              } 
            : ing
        )
      }));
    }
  };

  const handleAddRecipe = () => {
    if (newRecipe.name && newRecipe.category && newRecipe.ingredients.length > 0) {
      addRecipe(newRecipe);
      setNewRecipe({
        name: "",
        category: "",
        status: "active",
        ingredients: []
      });
      setShowAddModal(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <main className="flex-1 p-4 lg:p-8 pt-16 lg:pt-8">
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">Công thức</h1>
            <p className="text-muted-foreground">Quản lý công thức chế biến cho từng món</p>
          </div>
          <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-hero w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Thêm công thức
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Thêm công thức mới</DialogTitle>
                <DialogDescription>
                  Tạo công thức chế biến mới với danh sách nguyên liệu chi tiết
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tên công thức *</Label>
                    <Input
                      id="name"
                      value={newRecipe.name}
                      onChange={(e) => setNewRecipe({...newRecipe, name: e.target.value})}
                      placeholder="Nhập tên công thức"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Danh mục *</Label>
                    <Select value={newRecipe.category} onValueChange={(value) => setNewRecipe({...newRecipe, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soju">Soju</SelectItem>
                        <SelectItem value="cocktail">Cocktail</SelectItem>
                        <SelectItem value="coffee">Coffee</SelectItem>
                        <SelectItem value="juice">Nước hoa quả</SelectItem>
                        <SelectItem value="soft-drinks">Nước ngọt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select value={newRecipe.status} onValueChange={(value: "active" | "inactive") => setNewRecipe({...newRecipe, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="inactive">Tạm dừng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Nguyên liệu *</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
                      <Plus className="h-4 w-4 mr-1" />
                      Thêm nguyên liệu
                    </Button>
                  </div>
                  
                  {newRecipe.ingredients.map((ingredient, index) => (
                    <div key={ingredient.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Nguyên liệu {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeIngredient(ingredient.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor={`ingredient-${ingredient.id}`}>Chọn nguyên liệu</Label>
                          <Select 
                            value={ingredient.ingredientId || ""} 
                            onValueChange={(value) => handleIngredientSelect(ingredient.id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn nguyên liệu" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableIngredients.length > 0 ? (
                                availableIngredients.map((ing, index) => (
                                  <SelectItem key={`${ing.id}-${index}`} value={ing.id.toString()}>
                                    {ing.name} (Còn: {ing.stock} {ing.unit})
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="no-ingredients" disabled>
                                  Không có nguyên liệu nào
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor={`amount-${ingredient.id}`}>Số lượng</Label>
                          <Input
                            id={`amount-${ingredient.id}`}
                            type="number"
                            min="0"
                            step="0.1"
                            max={ingredient.ingredientId ? availableIngredients.find(ing => ing.id.toString() === ingredient.ingredientId)?.stock || 0 : undefined}
                            value={ingredient.amount}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              const selectedIngredient = availableIngredients.find(ing => ing.id.toString() === ingredient.ingredientId);
                              const maxAmount = selectedIngredient?.stock || 0;
                              
                              if (value <= maxAmount) {
                                setNewRecipe(prev => ({
                                  ...prev,
                                  ingredients: prev.ingredients.map(ing => 
                                    ing.id === ingredient.id ? { ...ing, amount: value } : ing
                                  )
                                }));
                              }
                            }}
                            placeholder="Nhập số lượng"
                          />
                          {ingredient.ingredientId && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Tối đa: {availableIngredients.find(ing => ing.id.toString() === ingredient.ingredientId)?.stock || 0} {ingredient.unit}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor={`unit-${ingredient.id}`}>Đơn vị</Label>
                          <Select 
                            value={ingredient.unit} 
                            onValueChange={(value) => {
                              setNewRecipe(prev => ({
                                ...prev,
                                ingredients: prev.ingredients.map(ing => 
                                  ing.id === ingredient.id ? { ...ing, unit: value } : ing
                                )
                              }));
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn đơn vị" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="g">g</SelectItem>
                              <SelectItem value="ml">ml</SelectItem>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="viên">viên</SelectItem>
                              <SelectItem value="lá">lá</SelectItem>
                              <SelectItem value="cái">cái</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {newRecipe.ingredients.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                      <ChefHat className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Chưa có nguyên liệu nào</p>
                      <p className="text-sm">Nhấn "Thêm nguyên liệu" để bắt đầu</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowAddModal(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleAddRecipe}>
                    Thêm công thức
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Công thức chế biến</CardTitle>
          </CardHeader>
          <CardContent>
            {recipes.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ChefHat className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">Chưa có công thức nào</p>
                <p className="text-sm">Bắt đầu tạo công thức chế biến cho các món ăn của bạn</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{recipe.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {recipe.category} • {recipe.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Nguyên liệu:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {recipe.ingredients.map((ingredient) => (
                          <div key={ingredient.id} className="text-sm bg-muted p-2 rounded">
                            {ingredient.ingredientName}: {ingredient.amount} {ingredient.unit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminRecipes;
