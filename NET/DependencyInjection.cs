using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Sabio.Data;
using Sabio.Models.Interfaces;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Services.TestQuestions;
using Sabio.Web.Api.StartUp.DependencyInjection;
using Sabio.Web.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;


namespace Sabio.Web.StartUp
{
    public class DependencyInjection
    {
        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            if (configuration is IConfigurationRoot)
            {
                services.AddSingleton<IConfigurationRoot>(configuration as IConfigurationRoot);   // IConfigurationRoot
            }

            services.AddSingleton<IConfiguration>(configuration);   // IConfiguration explicitly

            string connString = configuration.GetConnectionString("Default");
            // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-2.2
            // The are a number of differe Add* methods you can use. Please verify which one you
            // should be using services.AddScoped<IMyDependency, MyDependency>();

            // services.AddTransient<IOperationTransient, Operation>();

            // services.AddScoped<IOperationScoped, Operation>();

            // services.AddSingleton<IOperationSingleton, Operation>();

            services.AddSingleton<IAuthenticationService<int>, WebAuthenticationService>();

            services.AddSingleton<Sabio.Data.Providers.IDataProvider, SqlDataProvider>(delegate (IServiceProvider provider)
            {
                return new SqlDataProvider(connString);
            }
            );
        


            services.AddSingleton<IAppointmentsService, AppointmentsService>();
            services.AddSingleton<IBaseUserMapper, UserService>();
            services.AddSingleton<IBlogService, BlogService>();
            services.AddSingleton<IBorrowerDebtService, BorrowerDebtService>();
            services.AddSingleton<IBorrowersService, BorrowersService>();
            services.AddSingleton<IBusinessProfileService, BusinessProfileService>();
            services.AddSingleton<ICharitableFundService, CharitableFundService>();
            services.AddSingleton<ICheckoutService, CheckoutService>();
            services.AddSingleton<ICommentsService, CommentsService>();
            services.AddSingleton<ICourseService, CourseService>();
            services.AddSingleton<IDailyApiService, DailyApiService>();
            services.AddSingleton<IDailyMeetingService, DailyMeetingService>();
            services.AddSingleton<IDashboardService, DashboardService>();
            services.AddSingleton<IDonationsService, DonationsService>();
            services.AddSingleton<IEmailService, EmailService>();
            services.AddSingleton<IFAQsServices, FAQsServices>();
            services.AddSingleton<IFileService, FileService>();
            services.AddSingleton<IForumService, ForumService>();
            services.AddSingleton<IGoogleAnalyticsReportService, GoogleAnalyticsReportService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IIdentityProvider<int>, WebAuthenticationService>();
            services.AddSingleton<ILecturesService, LecturesService>();
            services.AddSingleton<ILenderService, LenderService>();
            services.AddSingleton<ILicensesService, LicensesService>();
            services.AddSingleton<ILoanApplicationService, LoanApplicationService>();
            services.AddScoped<ILocationService, LocationService>();
            services.AddSingleton<ILookUpService, LookUpService>();
            services.AddSingleton<ILicensesService, LicensesService>();
            services.AddSingleton<IMessageServices, MessageServices>();                        
            services.AddSingleton<INewsletterSubscriptionService, NewsletterSubscriptionService>();
            services.AddSingleton<INotesService, NotesService>();
            services.AddSingleton<IPaymentAccountService, PaymentAccountService>();
            services.AddSingleton<IRatingService, RatingService>();
            services.AddSingleton<ISiteReferenceService, SiteReferenceService>();
            services.AddSingleton<IStripeAccountService, StripeAccountService>();
            services.AddSingleton<IStripeSubscriptionService, StripeSubscriptionService>();
            services.AddSingleton<ITestAnswerService, TestAnswerService>();
            services.AddSingleton<ITestAnalyticsService, TestAnalyticsService>();
            services.AddSingleton<ITestInstanceService, TestInstanceService>();
            services.AddSingleton<ITestQuestionAnswerOptionsService, TestQuestionAnswerOptionsService>();
            services.AddSingleton<ITestQuestionService, TestQuestionService>();
            services.AddSingleton<ITestService, TestService>();
            services.AddSingleton<IThreadService, ThreadService>();
            services.AddSingleton<IUserService, UserService>();
            
            GetAllEntities().ForEach(tt =>
            {
                IConfigureDependencyInjection idi = Activator.CreateInstance(tt) as IConfigureDependencyInjection;

                //This will not error by way of being null. BUT if the code within the method does
                // then we would rather have the error loadly on startup then worry about debuging the issues as it runs
                idi.ConfigureServices(services, configuration);
            });
        }

        public static List<Type> GetAllEntities()
        {
            return AppDomain.CurrentDomain.GetAssemblies().SelectMany(x => x.GetTypes())
                 .Where(x => typeof(IConfigureDependencyInjection).IsAssignableFrom(x) && !x.IsInterface && !x.IsAbstract)
                 .ToList();
        }

        public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
        }
    }
}