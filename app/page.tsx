import HeroSection from "../components/HeroSection";
import CategorySlider from "../components/CategorySlider";
import Features from "../components/Features";
import FeaturedProducts from '../components/FeaturedProducts';
import FooterNewsletter from "../components/FooterNewsletter";

async function getData() {
  try {
    // محاولة جلب البيانات مع تحديد وقت انتظار أو كاش
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
      next: { revalidate: 3600 }, // تحديث البيانات كل ساعة فقط لتقليل الضغط
    });

    if (!res.ok) {
      return []; // إرجاع مصفوفة فارغة بدلاً من كسر الصفحة
    }

    const response = await res.json();
    return response.data || []; 
  } catch (error) {
    // في حالة الـ Timeout أو انقطاع النت، اطبع الخطأ في الـ Terminal وارجع مصفوفة فارغة
    console.error("Network Error (Timeout):", error);
    return []; 
  }
}

// 2. الـ Component الرئيسي
export default async function Home() {
  // جلب البيانات
  const categories = await getData();

  return (
    <main>
      {/* المكونات ستعمل الآن حتى لو المصفوفة فارغة ولن تظهر شاشة الخطأ الحمراء */}
      <HeroSection categories={categories} />
      <Features />
      <CategorySlider categories={categories} />
      <FeaturedProducts />
      <FooterNewsletter />
    </main>
  );
}