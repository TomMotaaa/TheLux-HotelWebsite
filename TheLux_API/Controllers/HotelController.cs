using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TheLux_API.Data;
using TheLux_API.Models;

namespace TheLux_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private HotelContext _context;
        public HotelController (HotelContext context)
        {
            //construtor
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Hotel>> GetAll() {
            return _context.Hotel.ToList();
        }

         [HttpGet("{HotelId}")]
        public ActionResult<List<Hotel>> Get(int HotelId) {
            try {
                var result = _context.Hotel.Find(HotelId);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> post(Hotel model)
        {
            try {
                _context.Hotel.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                {
                    //return Ok();
                    return Created($"/api/hotel/{model.qtdEstrelas}", model);
                }
            }
            catch 
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu incluir
            return BadRequest();
        }

        [HttpDelete("{HotelId}")]
        public async Task<ActionResult> delete(int HotelId) {
            try {
                // verifica se existe hotel a ser excluído
                var hotel = await _context.Hotel.FindAsync(HotelId);
                if (hotel == null)
                {
                    // método do EF
                    return NotFound();
                }
                _context.Remove(hotel);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }

        [HttpPut("{HotelId}")]
        public async Task<IActionResult> put(int HotelId, Hotel dadosHotelAlt)
        {
            try {
                // verifica se existe hotel a ser alterado
                var result = await _context.Hotel.FindAsync(HotelId);
                if (HotelId != result.id)
                {
                    return BadRequest();
                }
                result.nome = dadosHotelAlt.nome;
                result.qtdEstrelas = dadosHotelAlt.qtdEstrelas;
                result.localizacao = dadosHotelAlt.localizacao;
                result.qtdQuartos  = dadosHotelAlt.qtdQuartos;
                result.preco       = dadosHotelAlt.preco;
                await _context.SaveChangesAsync();
                return Created($"/api/hotel/{dadosHotelAlt.qtdEstrelas}", dadosHotelAlt);
            }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
    }
}