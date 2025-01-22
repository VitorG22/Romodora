
export interface IBlock {

    id: number
    variant: Array<{
        name: string,
        path: string[]

    }>
    statusCount: number
    filter: 'floor' | 'wall' | 'chest' | 'door'| 'border'|'mob'
    size: {
        X: number,
        Y: number
    }
    renderLevel: number,
    type: 'floor' | 'prop' | 'wall'|'mob',
    group: Array<number[]>
}

export const BlocksList: IBlock[] = [
    {
        id: 0,
        statusCount: 2,
        filter: 'floor',
        variant: [
            {
                name: 'Forest Needles',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Forest_Floor_Needles_A_02.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Forest_Floor_Needles_B_02.jpg',
                ]
            },
            {
                name: 'Forest Needles',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Forest_Floor_Needles_A_03.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Forest_Floor_Needles_B_03.jpg'
                ]
            },
        ],
        renderLevel: 0,
        type: 'floor',
        size: {
            X: 1,
            Y: 1
        },
        group:[[1]]
    },
    {
        id: 1,
        statusCount: 4,
        filter: 'floor',
        variant: [
            {
                name: 'White Marble Tile',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_A_01.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_B_01.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_C_01.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_C_02.jpg',
                ]
            },
            {
                name: 'Black Marble Tile',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_A_02.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_B_02.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_C_03.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_C_04.jpg',
                ]
            },
            {
                name: 'Green Marble Tile',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_A_03.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_B_03.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_C_05.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_C_06.jpg',
                ]
            },
            {
                name: 'Checkered Marble Tile',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_A_04.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_A_05.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_A_06.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Marble_Tiles_A_07.jpg',
                ]
            },
        ],
        renderLevel: 0,
        type: 'floor',
        size: {
            X: 2,
            Y: 2
        },
        group:[
            [1,1],
            [1,1]
    ]
    },
    {
        id: 2,
        statusCount: 3,
        filter: 'floor',
        variant: [
            {
                name: 'Rock',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Rock_A_01.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Rock_B_02.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Rock_C_02.jpg',
                ]
            },
            {
                name: 'Rock',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Rock_A_02.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Rock_B_01.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Rock_C_01.jpg',
                ]
            },
            {
                name: 'Rock',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Rock_A_03.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Rock_B_03.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Rock_C_03.jpg',
                ]
            },
            {
                name: 'Rock',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Rock_A_04.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Rock_B_04.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Rock_C_04.jpg',
                ]
            },
        ],
        renderLevel: 0,
        type: 'floor',
        size: {
            X: 1,
            Y: 1
        },
        group:[[1]]
    },
    {
        id: 3,
        statusCount: 2,
        filter: 'floor',
        variant: [
            {
                name: 'Grout',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Square_Grout_A_01.png',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Square_Grout_A_02.png',
                ]
            },
            {
                name: 'Grout',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Square_Grout_B_01.png',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Square_Grout_B_02.png',
                ]
            },
            {
                name: 'Grout',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Square_Grout_C_01.png',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Square_Grout_C_02.png',
                ]
            },
        ],
        renderLevel: 0,
        type: 'prop',
        size: {
            X: 2,
            Y: 2
        },
        group:[
            [1,1],
            [1,1]
    ]
    },
    {
        id: 4,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'Height Map',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Square_Tiles_HeightMap_Overlay.png',
                ]
            },
        ],
        renderLevel: 0,
        type: 'prop',
        size: {
            X: 2,
            Y: 2
        },
        group:[
            [1,1],
            [1,1]
        ]
    },
    {
        id: 5,
        statusCount: 4,
        filter: 'floor',
        variant: [
            {
                name: 'Still Water',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_A_01.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_B_01.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_C_01.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_Overlay_01.jpg',
                ]
            },
            {
                name: 'Still Water',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_A_02.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_B_02.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_C_02.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_Overlay_02.jpg',
                ]
            },
            {
                name: 'Still Water',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_A_03.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_B_03.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_C_03.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_Overlay_03.jpg',
                ]
            },
            {
                name: 'Still Water',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_A_04.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_B_04.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_C_04.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_Overlay_04.jpg',
                ]
            },
            {
                name: 'Still Water',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_A_05.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_B_05.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_C_05.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_Overlay_05.jpg',
                ]
            },
            {
                name: 'Still Water',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_A_06.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_B_06.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_C_06.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_Overlay_06.jpg',
                ]
            },
            {
                name: 'Still Water',
                path: [
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_A_07.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_B_07.jpg',
                    '/assets/modularTileSet/Floors/Texture_Pack_05/Still_Water_C_07.jpg',
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'floor',
        size: {
            X: 1,
            Y: 1
        },
        group:[[1]]
    },
    {
        id: 6,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Straight 1x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Straight_1x2_A.png'
                ]
            },
            {
                name: 'Dungeon Straight 1x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Straight_1x2_B.png'
                ]
            },
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X: 1,
            Y: 2
        },
        group:[
            [1],
            [1]
        ]
    },
    {
        id: 7,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Straight 2x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Straight_2x2_A.png'
                ]
            },
            {
                name: 'Dungeon Straight 2x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Straight_2x2_B.png'
                ]
            },
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X: 2,
            Y: 2
        },
        group:[
            [1,1],
            [1,1], 
        ]
    },
    {
        id: 8,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Corner In 2x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_2x2_A.png'
                ]
            },
            {
                name: 'Corner In 2x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_2x2_B.png'
                ]
            },
            {
                name: 'Corner In 2x2 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_2x2_C.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:2,
            Y:2
        },
        group:[
            [1,1],
            [1,1]
        ]
    },
    {
        id: 9,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Corner In 3x3 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_3x3_A.png'
                ]
            },
            {
                name: 'Corner In 3x3 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_3x3_B.png'
                ]
            },
            {
                name: 'Corner In 3x3 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_3x3_C.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:3,
            Y:3
        },
        group:[
            [0,1,1],
            [1,1,1],
            [1,1,1],
        ]
    },
    {
        id: 10,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Corner In 4x4 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_4x4_A.png'
                ]
            },
            {
                name: 'Corner In 4x4 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_4x4_B.png'
                ]
            },
            {
                name: 'Corner In 4x4 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_In_4x4_C.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:4,
            Y:4
        },
        group:[
            [0,0,1,1],
            [0,0,1,1],
            [1,1,1,1],
            [1,1,1,1],
        ]
    },
    {
        id: 11,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'Black Tile',
                path: [
                    '/assets/modularTileSet/Dungeon1/Black_Patch.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'floor',
        size: {
            X: 1,
            Y: 1
        },
        group:[[1]]
    },
    {
        id: 12,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Straight 2x3 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Straight_2x3_A.png'
                ]
            },
            {
                name: 'Dungeon Straight 2x3 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Straight_2x3_B.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X: 2,
            Y: 3
        },
        group:[
            [1,0],
            [1,1],
            [0,1],
        ]
    },
    {
        id: 13,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Corner Out 2x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_2x2_A.png'
                ]
            },
            {
                name: 'Corner Out 2x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_2x2_B.png'
                ]
            },
            {
                name: 'Corner Out 2x2 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_2x2_C.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:2,
            Y:2
        },
        group:[
            [1,1],
            [1,1]
        ]
    },
    {
        id: 14,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Corner Out 3x3 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_3x3_A.png'
                ]
            },
            {
                name: 'Corner Out 3x3 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_3x3_B.png'
                ]
            },
            {
                name: 'Corner Out 3x3 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_3x3_C.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:3,
            Y:3
        },
        group:[
            [0,1,1],
            [1,1,1],
            [1,1,1]
        ]
    },
    {
        id: 15,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Corner Out 4x4 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_4x4_A.png'
                ]
            },
            {
                name: 'Corner Out 4x4 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_4x4_B.png'
                ]
            },
            {
                name: 'Corner Out 4x4 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Corner_Out_4x4_C.png'
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:4,
            Y:4
        },
        group:[
            [0,0,1,1],
            [0,0,1,1],
            [1,1,1,1],
            [1,1,1,1],
        ]
    },
    {
        id: 16,
        statusCount: 1,
        filter: 'door',
        variant: [
            {
                name: 'Dungeon Wooden Door 1x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wooden_Door_1x2_A.png'
                ]
            },
            {
                name: 'Dungeon Wooden Door 1x2  B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wooden_Door_1x2_B.png'
                ]
            },
            {
                name: 'Dungeon Wooden Door 1x2 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wooden_Door_1x2_C.png'
                    
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'prop',
        size: {
            X:1,
            Y:2
        },
        group:[
            [1],
            [1]
        ]
    },
    {
        id: 17,
        statusCount: 1,
        filter: 'door',
        variant: [
            {
                name: 'Dungeon Wooden Double Door 2x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wooden_Double_Door_2x2_A.png'
                ]
            },
            {
                name: 'Dungeon Wooden Double Door 2x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wooden_Double_Door_2x2_B.png'
                ]
            },
            {
                name: 'Dungeon Wooden Double Door 2x2 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wooden_Double_Door_2x2_C.png'
                    
                ]
            },
            
        ],
        renderLevel: 0,
        type: 'prop',
        size: {
            X:2,
            Y:2
        },
        group:[
            [1,1],
            [1,1]
        ]
    },
    {
        id: 18,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Connector 2x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Connector_2x2.png'
                ]
            },       
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:2,
            Y:2
        },
        group:[
            [1,1],
            [1,1]
        ]
    },
    {
        id: 19,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall End Piece 1x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_End_Piece_1x2_A.png'
                ]
            },            
            {
                name: 'Dungeon Wall End Piece 1x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_End_Piece_1x2_B.png'
                ]
            },            
                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:1,
            Y:2
        },
        group:[
            [1],
            [1]
        ]
    },
    {
        id: 20,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall Fix A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Fix_1.png'
                ]
            },                        
            {
                name: 'Dungeon Wall Fix B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Fix_2.png'
                ]
            },                        
            {
                name: 'Dungeon Wall Fix C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Fix_3.png'
                ]
            },                        
            {
                name: 'Dungeon Wall Fix D',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Fix_4.png'
                ]
            },                        
            {
                name: 'Dungeon Wall Fix E',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Fix_5.png'
                ]
            },                        
            {
                name: 'Dungeon Wall Fix F',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Fix_6.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:1,
            Y:1
        },
        group:[[1]]
    },
    {
        id: 21,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall Straight 1x2',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Straight_1x1.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:1,
            Y:2
        },
        group:[
            [1],
            [1]
        ]
    },
    {
        id: 22,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall Straight 2x2',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Straight_2x2.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:2,
            Y:2
        },
        group:[
            [1,1],
            [1,1]
        ]
    },
    {
        id: 23,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall Straight 3x2',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Straight_3x2.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:3,
            Y:2
        },
        group:[
            [1,1,1],
            [1,1,1]
        ]
    },
    {
        id: 24,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall Straight 4x2',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Straight_4x2.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:4,
            Y:2
        },
        group:[
            [1,1,1,1],
            [1,1,1,1]
        ]
    },
    {
        id: 25,
        statusCount: 1,
        filter: 'wall',
        variant: [
            {
                name: 'Dungeon Wall Crossroad 2x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Crossroad_2x2_A.png'
                ]
            },            
            {
                name: 'Dungeon Wall Crossroad 2x2 C',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Wall_Crossroad_2x2_B.png'
                ]
            },                             
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:2,
            Y:2
        },
        group:[
            [1,1],
            [1,1]
        ]
    },
    {
        id: 26,
        statusCount: 1,
        filter: 'mob',
        variant: [
            {
                name: 'King Of Rats',
                path: [
                    'https://i.pinimg.com/736x/5a/bc/55/5abc559179cd4a901d7a15c9616f85c8.jpg'
                ]
            }                             
        ],
        renderLevel: 0,
        type: 'mob',
        size: {
            X:2,
            Y:2
        },
        group:[
            [1,1],
            [1,1]
        ]
    },
    {
        id: 27,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Dead End 3x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Dead_End_3x2_A.png'
                ]
            },                        
            {
                name: 'Dungeon Dead End 3x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Dead_End_3x2_B.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:3,
            Y:2
        },
        group:[
            [1,1,1],
            [1,1,1]
        ]
    },
    {
        id: 28,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Dead End Out 3x2 A',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Dead_End_Out_3x2_A.png'
                ]
            },                        
            {
                name: 'Dungeon Dead End 3x2 B',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Dead_End_Out_3x2_B.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:3,
            Y:2
        },
        group:[
            [0,1,0],
            [1,1,1]
        ]
    },
    {
        id: 29,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon End',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_End_Right.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:1,
            Y:2
        },
        group:[
            [1],
            [1]
        ]
    },
    {
        id: 30,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Pillar',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Pillar_1x1_A.png'
                ]
            },                        
            {
                name: 'Dungeon Pillar',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Pillar_1x1_B.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:1,
            Y:1
        },
        group:[
            [1]
        ]
    },
    {
        id: 31,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Pillar',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Pillar_2x2_A.png'
                ]
            },                        
            {
                name: 'Dungeon Pillar',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Pillar_2x2_B.png'
                ]
            },                        
            {
                name: 'Dungeon Pillar',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Pillar_2x2_C.png'
                ]
            },                        
            {
                name: 'Dungeon Pillar',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Pillar_2x2_D.png'
                ]
            },                        
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:2,
            Y:2
        },
        group:[
            [1,1],
            [1,1]
        ]
    },
    {
        id: 33,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'Dungeon Stair 2x2',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Stairs_Thick_2x2.png'
                ]
            },                      
            {
                name: 'Dungeon Stair 2x2',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Stairs_Thick_2x2_Transparent.png'
                ]
            },                      
        ],
        renderLevel: 0,
        type: 'prop',
        size: {
            X:2,
            Y:2
        },
        group:[
            [1,1],
            [1,1]
        ]
    },
    {
        id: 34,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'Dungeon Stair 3x2',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Stairs_Thick_3x2.png'
                ]
            },                      
            {
                name: 'Dungeon Stair 3x2',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Stairs_Thick_3x2_Transparent.png'
                ]
            },                      
        ],
        renderLevel: 0,
        type: 'prop',
        size: {
            X:3,
            Y:2
        },
        group:[
            [1,1,1],
            [1,1,1],
        ]
    },
    {
        id: 35,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'Dungeon Stair 2x1',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Stairs_Thin_2x1.png'
                ]
            },                      
            {
                name: 'Dungeon Stair 2x1',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Stairs_Thin_2x1_Transparent.png'
                ]
            },                      
        ],
        renderLevel: 0,
        type: 'prop',
        size: {
            X:2,
            Y:1
        },
        group:[
            [1,1]
        ]
    },
    {
        id: 36,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Straight 3x3',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Straight_3x3_A.png'
                ]
            },                  
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:3,
            Y:1
        },
        group:[
            [1,1,1]
        ]
    },
    {
        id: 37,
        statusCount: 1,
        filter: 'border',
        variant: [
            {
                name: 'Dungeon Straight 4x4',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Straight_4x4_A.png'
                ]
            },                  
        ],
        renderLevel: 0,
        type: 'wall',
        size: {
            X:4,
            Y:4
        },
        group:[
            [1,1,0,0],
            [1,1,1,0],
            [0,1,1,1],
            [0,0,1,1],
        ]
    },
    {
        id: 38,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'Hatching Patern',
                path: [
                    '/assets/modularTileSet/Dungeon1/Hatching_Patern_A.png'
                ]
            },                  
        ],
        renderLevel: 0,
        type: 'floor',
        size: {
            X:1,
            Y:1
        },
        group:[
            [1],
        ]
    },
    {
        id: 39,
        statusCount: 1,
        filter: 'floor',
        variant: [
            {
                name: 'Dungeon Stair 3x1',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Stairs_Thin_3x1.png'
                ]
            },                      
            {
                name: 'Dungeon Stair 3x1',
                path: [
                    '/assets/modularTileSet/Dungeon1/Dungeon_Stairs_Thin_3x1_Transparent.png'
                ]
            },                      
        ],
        renderLevel: 0,
        type: 'prop',
        size: {
            X:3,
            Y:1
        },
        group:[
            [1,1,1]
        ]
    },
]