package com.pokemonreview.api.service;

import com.pokemonreview.api.dto.ReviewDto;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ReviewService {
    ReviewDto createReview(int pokemonId, ReviewDto reviewDto);
    List<ReviewDto> getReviewsByPokemonId(int id);
    ReviewDto getReviewById(int reviewId, int pokemonId);
    ReviewDto updateReview(int pokemonId, int reviewId, ReviewDto reviewDto);
    void deleteReview(int pokemonId, int reviewId);
}
