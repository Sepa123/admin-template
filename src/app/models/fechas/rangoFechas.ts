const year = new Date().getFullYear();

const mesesDelAño : any = {
  Enero: {
    inicio: `${year}-01-01`,
    termino: `${year}-02-01`,
  },
  Febrero: {
    inicio: `${year}-02-01`,
    termino: `${year}-03-01`,
  },
  Marzo: {
    inicio: `${year}-03-01`,
    termino: `${year}-04-01`,
  },
  Abril: {
    inicio: `${year}-04-01`,
    termino: `${year}-05-01`,
  },
  Mayo: {
    inicio: `${year}-05-01`,
    termino: `${year}-06-01`,
  },
  "Junio": {
    inicio: `${year}-06-01`,
    termino: `${year}-07-01`,
  },
  Julio: {
    inicio: `${year}-07-01`,
    termino: `${year}-08-01`,
  },
  Agosto: {
    inicio: `${year}-08-01`,
    termino: `${year}-09-01`,
  },
  Septiembre: {
    inicio: `${year}-09-01`,
    termino: `${year}-10-01`,
  },
  Octubre: {
    inicio: `${year}-10-01`,
    termino: `${year}-11-01`,
  },
  Noviembre: {
    inicio: `${year}-11-01`,
    termino: `${year}-12-01`,
  },
  Diciembre: {
    inicio: `${year}-12-01`,
    termino: `${year + 1}-01-01`,
  },
};

export default mesesDelAño;
