
/**
 * Represents the dimensions of a 2D object.
 * 
 * @property {number} width - The width of the object.
 * @property {number} height - The height of the object.
 */
interface Size { width: number, height: number }

/**
 * Represents a position in a 2D space.
 * 
 * @property {number} x - The x-coordinate of the position.
 * @property {number} y - The y-coordinate of the position.
 */
interface Position { x: number, y: number }

export type { Size, Position }