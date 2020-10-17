using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iCoode.Core.Interfaces.DAL;
using iCoode.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace iCoode.DAL.DataProviders
{
    public abstract class DataProviderBase<TDbModel> : ICrud<TDbModel>
        where TDbModel : DBModel
    {
        protected iCoodeContext context = new iCoodeContext();

        public virtual async Task CreateAsync(TDbModel model)
        {
            await context.Set<TDbModel>().AddAsync(model);
            await context.SaveChangesAsync();
        }

        public virtual async Task<TDbModel> ReadAsync(int id)
        {
            return await context.Set<TDbModel>().FirstOrDefaultAsync(x => x.Id == id);
        }

        public virtual async Task<ICollection<TDbModel>> ReadAllAsync()
        {
            return await context.Set<TDbModel>().ToArrayAsync();
        }

        public virtual async Task UpdateAsync(TDbModel model)
        {
            throw new NotImplementedException();
        }

        public virtual async Task DeleteAsync(int id)
        {
            context.Set<TDbModel>().Remove(context.Set<TDbModel>().First(x => x.Id == id));
            await context.SaveChangesAsync();
        }

        public async Task<bool> IsExistAsync(int id)
        {
            return await context.Set<TDbModel>().AnyAsync(x => x.Id == id);
        }
    }
}