#ifndef POINT_H
#define POINT_H

class Point {
public:
    Point(double x, double y); // Constructor
    double getX() const;       // Getter for X
    double getY() const;       // Getter for Y

private:
    double x;
    double y;
};

#endif // POINT_H