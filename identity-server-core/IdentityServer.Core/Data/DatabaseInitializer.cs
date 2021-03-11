using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace IdentityServer.Core.Data
{
    public static class DatabaseInitializer
    {
        public static void PopulateIdentityServer(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope();
            serviceScope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();

            var context = serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();

            context.Database.Migrate();

            foreach (var client in Config.Clients)
            {
                var item = context.Clients.SingleOrDefault(c => c.ClientName == client.ClientName);

                if (item == null)
                {
                    item = new IdentityServer4.EntityFramework.Entities.Client();
                    context.Clients.Add(client.ToEntity());
                }

                item = client.ToEntity();
            }

            foreach (var resource in Config.ApiResources)
            {
                var item = context.ApiResources.SingleOrDefault(c => c.Name == resource.Name);

                if (item == null)
                {
                    item = new IdentityServer4.EntityFramework.Entities.ApiResource();
                    context.ApiResources.Add(resource.ToEntity());
                }

                item = resource.ToEntity();
            }

            foreach (var scope in Config.ApiScopes)
            {
                var item = context.ApiScopes.SingleOrDefault(c => c.Name == scope.Name);

                if (item == null)
                {
                    item = new IdentityServer4.EntityFramework.Entities.ApiScope();
                    context.ApiScopes.Add(scope.ToEntity());
                }

                item = scope.ToEntity();
            }

            context.SaveChanges();
        }
    }
}
