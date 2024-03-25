package com.pokemonreview.api.initializer;

import com.pokemonreview.api.repository.PokemonRepository;
import com.pokemonreview.api.repository.ReviewRepository;
import com.pokemonreview.api.repository.RoleRepository;
import com.pokemonreview.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SampleDataLoader {

    private final PokemonRepository pokemonRepository;
    private final ReviewRepository reviewRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;



}
