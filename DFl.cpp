#include <SFML/Graphics.hpp>
#include <iostream>

const int SCREEN_WIDTH = 640;
const int SCREEN_HEIGHT = 480;
const int PIPE_GAP = 200;
const float PIPE_SPEED = 3.0f;
const float GRAVITY = 1.5f;

int main() {
    // Tworzenie okna
    sf::RenderWindow window(sf::VideoMode(SCREEN_WIDTH, SCREEN_HEIGHT), "Flappy Bird");

    // Ustawienie czcionki
    sf::Font font;
    if (!font.loadFromFile("arial.ttf")) {
        std::cerr << "Nie można załadować czcionki Arial!" << std::endl;
        return -1;
    }

    // Tworzenie tekstu punktacji
    sf::Text scoreText;
    scoreText.setFont(font);
    scoreText.setCharacterSize(40);
    scoreText.setPosition(SCREEN_WIDTH - 100, 10);

    // Tworzenie ptaka
    sf::Texture birdTexture;
    if (!birdTexture.loadFromFile("bird.png")) {
        std::cerr << "Nie można załadować tekstury ptaka!" << std::endl;
        return -1;
    }
    sf::Sprite bird(birdTexture);
    bird.setPosition(SCREEN_WIDTH / 2 - birdTexture.getSize().x / 2, SCREEN_HEIGHT / 2 - birdTexture.getSize().y / 2);
    float birdVelocity = 0.0f;

    // Tworzenie rurek
    sf::Texture pipeTexture;
    if (!pipeTexture.loadFromFile("pipe.png")) {
        std::cerr << "Nie można załadować tekstury rurki!" << std::endl;
        return -1;
    }
    std::vector<sf::Sprite> pipes;
    sf::Sprite pipe(pipeTexture);
    pipe.setPosition(SCREEN_WIDTH, 0);
    pipes.push_back(pipe);

    // Zmienne pomocnicze
    int score = 0;
    bool isGameOver = false;

    // Główna pętla gry
    while (window.isOpen()) {
        // Obsługa zdarzeń
        sf::Event event;
        while (window.pollEvent(event)) {
            if (event.type == sf::Event::Closed) {
                window.close();
            }
            else if (event.type == sf::Event::KeyPressed && event.key.code == sf::Keyboard::Space && !isGameOver) {
                birdVelocity = -10.0f;
            }
        }

        // Aktualizacja ptaka
        if (!isGameOver) {
            birdVelocity += GRAVITY;
            bird.move(0.0f, birdVelocity);
        }

        // Aktualizacja rurek
        for (size_t i = 0; i < pipes.size(); i++) {
            pipes[i].move(-PIPE_SPEED, 0.0f);
            if (pipes[i].getPosition().x < -pipeTexture.getSize().x) {
                pipes.erase(pipes.begin() + i);
                score++;
            }
        }
        if (pipes.back().getPosition().x < SCREEN_WIDTH - PIPE_GAP) {
            sf::Sprite newPipe(pipeTexture);
            newPipe.setPosition(SCREEN_WIDTH, rand() % (SCREEN_HEIGHT - PIPE_GAP));
            pipes.push_back(newPipe);
        }

        // Sprawdzenie kolizji
        for (size_t i = 0; i < pipes.size(); i++) {
            if (bird.getGlobalBounds


