using System.Collections.Generic;
using Nop.Web.Framework.Mvc;
using Nop.Web.Models.Media;

namespace Nop.Web.Models.Catalog
{
    public partial class BestSellersModel : BaseNopEntityModel
    {
        public BestSellersModel()
        { 
            Products = new List<ProductOverviewModel>();
            PagingFilteringContext = new ProductListPagingFilteringModel(); 
        }

        public ProductListPagingFilteringModel PagingFilteringContext { get; set; } 

        public IList<ProductOverviewModel> Products { get; set; }
        

		 
    }
}