using Categories.ExpenseCodes;
using Categories.LegalEntitys;
using Categories.Departments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Domain.Entities.Events.Distributed;


namespace Categories.Trips
{
    public class TripInformationService: ApplicationService, ITripExpenseAppService
    {
        private readonly IRepository<Trip, Guid> _TripInformationRepository;
        private readonly IRepository<ExpenseCode, Guid> _expenseCodeRepository;
        private readonly IRepository<Department, Guid> _departmentRepository;
        private readonly IRepository<LegalEntity, Guid> _legalRepository;
        public TripInformationService(IRepository<Trip, Guid> TripInformationRepository,
            IRepository<ExpenseCode, Guid> expenseCodeRepository,
            IRepository<LegalEntity, Guid> legalRepository,
            IRepository<Department, Guid> departmentRepository)
        {
            _legalRepository= legalRepository;
            _expenseCodeRepository= expenseCodeRepository;
            _TripInformationRepository= TripInformationRepository;
            _departmentRepository = departmentRepository;
        }

        public async Task<TripInformationDto> CreateTripInformationAsync(TripInformationDto dto)
        {
            var legal = await _legalRepository.GetListAsync();
            var ex = await _expenseCodeRepository.GetListAsync();
            var department = await _departmentRepository.GetListAsync();
            var items = await _TripInformationRepository.GetListAsync();
            Trip trip = new Trip
            {
                OperaterName = dto.OperaterName,
                VerifierName = dto.VerifierName,
                VerifierUsername = dto.VerifierUsername,
                BusinessType = dto.BusinessType,
                Notes = dto.Notes,
                RequestedDate = dto.RequestedDate,
                RequestNumber = dto.RequestNumber,
                DepartmentID = (Guid)department.FirstOrDefault(d => d.Code == dto.Department)?.Id,
                ExpenseCodeID = (Guid)ex.FirstOrDefault(d => d.Code == dto.ExpenseCode)?.Id,
                LegalID = (Guid)legal.FirstOrDefault(d => d.Code == dto.LegalEntity)?.Id,
                totalAmount = dto.totalAmount,
            };
            var item = await _TripInformationRepository.InsertAsync(trip);
            var create = new TripInformationDto
            {
                Id = item.Id,
                OperaterName = item.OperaterName,
                VerifierName = item.VerifierName,
                VerifierUsername = item.VerifierUsername,
                BusinessType = item.BusinessType,
                Notes = item.Notes,
                RequestedDate = item.RequestedDate,
                RequestNumber = item.RequestNumber,
                Department = department.FirstOrDefault(d => d.Id == item.Id)?.Code,
                ExpenseCode = ex.FirstOrDefault(d => d.Id == item.Id)?.Code,
                LegalEntity = legal.FirstOrDefault(d => d.Id == item.Id)?.Code,
                totalAmount = item.totalAmount,
            };
 
            return create;
        }

        public async Task<List<TripInformationDto>> GetTripInformationAsync()
        {
            var legal = await _legalRepository.GetListAsync();
            var ex = await _expenseCodeRepository.GetListAsync();
            var department = await _departmentRepository.GetListAsync();
            var items = await _TripInformationRepository.GetListAsync();
            return items.Select(e => new TripInformationDto
            {
                Id = e.Id,
                OperaterName = e.OperaterName,
                VerifierName = e.VerifierName,
                VerifierUsername = e.VerifierUsername,
                BusinessType = e.BusinessType,
                Notes = e.Notes,
                RequestedDate = e.RequestedDate,
                RequestNumber = e.RequestNumber,
                Department = department.FirstOrDefault(d => d.Id == e.DepartmentID)?.Code,
                ExpenseCode = ex.FirstOrDefault(b => b.Id == e.ExpenseCodeID)?.Code,
                LegalEntity = legal.FirstOrDefault(t => t.Id == e.LegalID)?.Code,
                totalAmount = e.totalAmount
            }).ToList();
        }
        public async Task<List<TripInformationDto>> GetListIDAsync(Guid id)
        {
            var legal = await _legalRepository.GetListAsync();
            var ex = await _expenseCodeRepository.GetListAsync();
            var department = await _departmentRepository.GetListAsync();
            var items = await _TripInformationRepository.GetListAsync();
            return items.Where(e => e.Id.Equals(id)).Select(e=> new TripInformationDto
            {
                Id = e.Id,
                OperaterName = e.OperaterName,
                VerifierName = e.VerifierName,
                VerifierUsername = e.VerifierUsername,
                BusinessType = e.BusinessType,
                Notes = e.Notes,
                RequestedDate = e.RequestedDate,
                RequestNumber = e.RequestNumber,
                Department = department.FirstOrDefault(d => d.Id == e.DepartmentID)?.Code,
                ExpenseCode = ex.FirstOrDefault(b => b.Id == e.ExpenseCodeID)?.Code,
                LegalEntity = legal.FirstOrDefault(t => t.Id == e.LegalID)?.Code,
                totalAmount = e.totalAmount
            }).ToList();
        }
       
    }
   
}
