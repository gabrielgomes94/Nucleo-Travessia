function Click_Info(Cod_Regi){
	
	var Properties_Comu = [];
	switch (Cod_Regi) {
		case "CMD1":
			Properties_Comu.push(" Capitão Felizardo");
			Properties_Comu.push("Cana, milho, feijão, mandioca, café");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, carambola, acerola, manga, uva, limão, goiaba");
			Properties_Comu.push("Queijo, doces, cachaça, farinha de mandioca, fubá de milho");
			Properties_Comu.push("Galinha (ovos), suínos, gado (para atividade leiteira))");
			break;
			
		case "CMD2":
			Properties_Comu.push(" Costa Sena e Goiabeiras");
			Properties_Comu.push("Cana, milho, feijão, mandioca, café");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, acerola, manga, limão, abacate e goiaba");
			Properties_Comu.push("Queijo, requeijão, polvilho, farinha de mandioca");
			Properties_Comu.push("Galinha (ovos), suínos e gado (para atividade leiteira)");
			break;

		case "CMD3":
			Properties_Comu.push(" Tapera e Santo Antônio do Cruzeiro");
			Properties_Comu.push("Milho, mandioca, amendoim, inhame e café   ");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, manga");
			Properties_Comu.push("Quitandas (biscoito de polvilho, biscoito de amendoim, rosquinhas e pão de goiabada), doces (de laranja, limão, goiaba), geleias de frutas");
			Properties_Comu.push("Galinha (ovos)");
			break;

		case "CMD4":
			Properties_Comu.push(" Ouro Fino e Córregos");
			Properties_Comu.push("Milho, mandioca, feijão, café");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, carambola, acerola, caqui, goiaba");
			Properties_Comu.push("Queijo, requeijão, quitandas, doce de leite");
			Properties_Comu.push("Galinha (ovos), gado (para atividade leiteira), suínos e peixes");
			break;

		case "CMD5":
			Properties_Comu.push(" Água Quente e Sapo");
			Properties_Comu.push("Cana, milho, feijão, mandioca, café");
			Properties_Comu.push("Não são mais cultivadas devido à falta d’água, com exceção da comunidade de Passa Sete");
			Properties_Comu.push("Frutas não desenvolvem mais em seus quintais");
			Properties_Comu.push("Queijo (somente para consumo), farinha de mandioca");
			Properties_Comu.push("Galinha (ovos), gado (para atividade leiteira)");
			break;

		case "CMD6":
			Properties_Comu.push(" Parauninha e Itacolomi");
			Properties_Comu.push("Mandioca, cana, milho, feijão");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, manga, uvaia, goiaba");
			Properties_Comu.push("Farinha de mandioca, cachaça, rapadura e doces");
			Properties_Comu.push("Galinha (ovos), gado (para atividade leiteira)");
			break;

		case "CMD7":
			Properties_Comu.push(" Tabuleiro");
			Properties_Comu.push("Mandioca, cana, milho, amendoim, feijão, inhame, café e batata doce");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, manga, jabuticaba,  goiaba");
			Properties_Comu.push("Farinha de mandioca, cachaça e rapadura");
			Properties_Comu.push("Galinha (ovos), suínos e abelhas");
			break;

		case "CMD8":
			Properties_Comu.push("Três Barras, Buraco e Cubas");
			Properties_Comu.push("Feijão, milho, mandioca, cana e café");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, manga, mamão, mexerica, limão, goiaba");
			Properties_Comu.push(" queijo, fubá, mel, farinha de mandioca");
			Properties_Comu.push("Galinha (ovos), gado (para a atividade leiteira), abelhas e peixes");
			break;

		case "CMD9":
			Properties_Comu.push(" Brejaúba e Socorro");
			Properties_Comu.push("Milho, mandioca, feijão, amendoim e café");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, manga, jabuticaba, mexerica, goiaba");
			Properties_Comu.push("Queijo, requeijão, muçarela, quitandas, fubá de milho, rapadura");
			Properties_Comu.push("Galinha (ovos), gado (para atividade leiteira), suínos, abelhas");
			break;

		case "AM1":
			Properties_Comu.push(" Lapinha e Ribeirão Santana");
			Properties_Comu.push("Cana, milho, feijão, mandioca e café");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, acerola, manga, mexerica, mamão, goiaba");
			Properties_Comu.push("Queijo (certificado), doces, geleias, quitandas, farinha de mandioca e rala de queijo");
			Properties_Comu.push("Galinha (ovos), gado (para atividade leiteira), suínos, peixes");
			break;

		case "AM2":
			Properties_Comu.push(" Fazenda da Ponte");
			Properties_Comu.push("Milho, cana, feijão, inhame e mandioca");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, acerola, manga, mamão, limão e goiaba");
			Properties_Comu.push("Queijo (certificado), cachaça e farinha de mandioca");
			Properties_Comu.push("Galinha (ovos), gado (para atividade leiteira), suínos");
			break;

		case "AM3":
			Properties_Comu.push(" Descoberto e Bom Jesus");
			Properties_Comu.push("Milho, feijão, mandioca, café");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja e acerola");
			Properties_Comu.push("Farinha de mandioca");
			Properties_Comu.push("Galinha (ovos), gado, suínos e peixes");
			break;

		case "AM4":
			Properties_Comu.push(" Morro dos Monteiros");
			Properties_Comu.push("Milho, feijão,  mandioca e café");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana");
			Properties_Comu.push("Farinha de mandioca");
			Properties_Comu.push("Galinha (ovos),  peixe");
			break;

		case "AM5":
			Properties_Comu.push(" Ribeirão de Trás");
			Properties_Comu.push("Milho, cana, feijão, mandioca, arroz, inhame, café");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, acerola, mamão, mexerica e goiaba");
			Properties_Comu.push("Queijo, farinha de mandioca, doces, geleias, rapadura e melado");
			Properties_Comu.push("Galinha (ovos), gado (para atividade leiteira), suínos");
			break;

		case "DJ1":
			Properties_Comu.push(" Cachoeira");
			Properties_Comu.push("Milho, cana, feijão, arroz, café,mandioca");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, acerola, mamão, abacate, mexerica e goiaba");
			Properties_Comu.push("Queijo, rapadura e melado");
			Properties_Comu.push("Galinha (ovos), gado (para atividade leiteira), suínos");
			break;

		case "DJ2":
			Properties_Comu.push(" Machados");
			Properties_Comu.push("Milho, cana, feijão, cafe");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, carambola, mexerica e abacaxi");
			Properties_Comu.push("Quitandas, doces e requeijão");
			Properties_Comu.push("Galinha (ovos), gado (para atividade leiteira), suínos");
			break;

		case "DJ3":
			Properties_Comu.push(" São José da Ilha");
			Properties_Comu.push("Milho, cana, feijão e mandioca");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Mamão, manga, goiaba, laranja e mexerica");
			Properties_Comu.push("Quitandas, doce de leite, doces de frutas (cidra, mamão, manga e goiaba) e cachaça");
			Properties_Comu.push(" galinha (ovos), gado (para atividade leiteira), suínos");
			break;

		case "DJ4":
			Properties_Comu.push(" Sesmaria e Serra");
			Properties_Comu.push("Milho, cana, feijão, mandioca, café");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, acerola, manga, amora, graviola e goiaba");
			Properties_Comu.push("Queijo, requeijão, muçarela, provolone, iogurte, doce de leite, quitandas, doces e geleias de frutas diversas");
			Properties_Comu.push("Galinha (ovos), gado (para atividade leiteira), suínos, abelhas");
			break;

		case "DJ5":
			Properties_Comu.push(" São João");
			Properties_Comu.push("Milho, cana, feijão, café e mandioca");
			Properties_Comu.push("Possui");
			Properties_Comu.push("Banana, laranja, pera, goiaba e araçá");
			Properties_Comu.push("Mel, própolis e cachaça");
			Properties_Comu.push("Galinha, ovos e abelhas");
			break;
	}
	
	return Properties_Comu;

}
	
	