using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using FluentValidation.Attributes;
using Nop.Web.Framework.Mvc;
using Nop.Web.Models.Catalog; 

namespace Nop.Web.Models.Discounts
{

    public partial class DiscountModel : BaseNopEntityModel
    {
        public DiscountModel()
        {
            AppliedToCategoryModels = new List<AppliedToCategoryModel>();
            AppliedToProductModels = new List<AppliedToProductModel>();
            AvailableDiscountRequirementRules = new List<SelectListItem>();
            DiscountRequirementMetaInfos = new List<DiscountRequirementMetaInfo>();
            ListAppliedProducts = new List<ProductOverviewModel>();
            PagingFilteringContext = new ProductListPagingFilteringModel();
        }
          
        public string Name { get; set; }
        public string Description { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaDescription { get; set; }
        public string MetaTitle { get; set; }
        public string SeName { get; set; } 
        public int DiscountTypeId { get; set; }
         
        public bool UsePercentage { get; set; }
         
        public decimal DiscountPercentage { get; set; }
         
        public decimal DiscountAmount { get; set; }
        public string PrimaryStoreCurrencyCode { get; set; }
          
        public DateTime? StartDateUtc { get; set; }
          
        public DateTime? EndDateUtc { get; set; }
         
        public bool RequiresCouponCode { get; set; }
         
        public string CouponCode { get; set; }
         
        public int DiscountLimitationId { get; set; }
         
        public int LimitationTimes { get; set; } 
        public IList<AppliedToCategoryModel> AppliedToCategoryModels { get; set; } 
        public IList<AppliedToProductModel> AppliedToProductModels { get; set; }
        public string AddDiscountRequirement { get; set; } 
        public IList<SelectListItem> AvailableDiscountRequirementRules { get; set; } 
        public IList<DiscountRequirementMetaInfo> DiscountRequirementMetaInfos { get; set; }
        public ProductListPagingFilteringModel PagingFilteringContext { get; set; }
        public IList<ProductOverviewModel> ListAppliedProducts { get; set; }
        
        #region Nested classes

        public partial class DiscountRequirementMetaInfo : BaseNopModel
        {
            public int DiscountRequirementId { get; set; }
            public string RuleName { get; set; }
            public string ConfigurationUrl { get; set; }
        }

        public partial class DiscountUsageHistoryModel : BaseNopEntityModel
        {
            public int DiscountId { get; set; } 
            public int OrderId { get; set; } 
            public DateTime CreatedOn { get; set; }
        }

        public partial class AppliedToCategoryModel : BaseNopModel
        {
            public int CategoryId { get; set; }

            public string Name { get; set; }
        }

        public partial class AppliedToProductModel : BaseNopModel
        {
            public int ProductId { get; set; }

            public string ProductName { get; set; }
        }
        
        #endregion
    }
}