using System.Collections.Generic;
using Nop.Web.Framework.Mvc;
using Nop.Web.Models.Media;

namespace Nop.Web.Models.Catalog
{
    public partial class ListProductModel : BaseNopEntityModel
    {
        public ListProductModel()
        {  
            Products = new List<ProductOverviewModel>();
            PagingFilteringContext = new ProductListPagingFilteringModel();  
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescription { get; set; }
        public string MetaTitle { get; set; }
        public string SeName { get; set; }
         

        public ProductListPagingFilteringModel PagingFilteringContext { get; set; }
           
        public IList<ProductOverviewModel> Products { get; set; }
         
    }
}