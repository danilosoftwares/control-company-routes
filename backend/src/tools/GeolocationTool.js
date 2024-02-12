function calculateDistance(x1, y1, x2, y2) {
    // Calcular a diferença entre as coordenadas X
    const deltaX = x2 - x1;
  
    // Calcular a diferença entre as coordenadas Y
    const deltaY = y2 - y1;
  
    // Calcular a distância usando o teorema de Pitágoras
    const distance = Math.sqrt((deltaX ** 2) + (deltaY ** 2));
  
    // Retornar a distância
    return distance;
  }

module.exports = {
    calculateDistance,
};
